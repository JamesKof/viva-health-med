import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const hubtelApiId = Deno.env.get("HUBTEL_API_ID");
    const hubtelApiKey = Deno.env.get("HUBTEL_API_KEY");
    const merchantAccountNumber = Deno.env.get("HUBTEL_MERCHANT_ACCOUNT_NUMBER");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!hubtelApiId || !hubtelApiKey || !merchantAccountNumber) {
      console.error("Hubtel credentials not configured");
      return new Response(JSON.stringify({ error: "Payment gateway not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase credentials not configured");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    let { totalAmount, description } = body;
    const { clientReference, email, donorName, phone, ticket } = body;

    const TIERS: Record<string, { price: number; label: string }> = {
      supporter: { price: 500, label: "Supporter" },
      champion: { price: 1000, label: "Champion" },
      impact_maker: { price: 2500, label: "Impact Maker" },
      change_maker: { price: 5000, label: "Change Maker" },
      legacy_partner: { price: 10000, label: "Legacy Partner" },
    };
    let ticketRow: Record<string, unknown> | null = null;
    if (ticket) {
      const tier = TIERS[ticket.tier];
      const qty = Math.floor(Number(ticket.quantity));
      const name = String(donorName || "").trim();
      const ph = String(phone || "").trim();
      if (!tier || !(qty >= 1 && qty <= 20) || name.length < 2 || name.length > 200 || ph.length < 7 || ph.length > 30 ||
          !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email || ""))) {
        return new Response(JSON.stringify({ error: "Invalid ticket details" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      let unit = tier.price;
      if (ticket.tier === "legacy_partner" && Number(ticket.customAmount) > unit) {
        unit = Math.min(Math.round(Number(ticket.customAmount)), 1000000);
      }
      totalAmount = unit * qty;
      description = `5th Anniversary Dinner - ${tier.label} x${qty}`;
      ticketRow = {
        payment_reference: clientReference, tier: ticket.tier, quantity: qty, unit_price: unit,
        total_amount: totalAmount, full_name: name, email, phone: ph,
        organization: ticket.organization ? String(ticket.organization).slice(0, 200) : null,
        guest_names: ticket.guestNames ? String(ticket.guestNames).slice(0, 1000) : null,
      };
    }

    if (!totalAmount || !email || !clientReference) {
      return new Response(JSON.stringify({ error: "Amount, email, and clientReference are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Initiating Hubtel payment:", { totalAmount, email, clientReference, donorName });

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create pending donation record
    const { error: insertError } = await supabase.from("donations").insert({
      amount: totalAmount,
      email,
      donor_name: donorName || "Anonymous",
      phone: phone || null,
      payment_reference: clientReference,
      payment_status: "pending",
      donation_type: ticketRow ? "ticket" : "one-time",
      currency: "GHS",
    });

    if (insertError) {
      console.error("Failed to create pending donation:", insertError);
      return new Response(JSON.stringify({ error: "Failed to initialize donation" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (ticketRow) {
      const { error: tErr } = await supabase.from("ticket_registrations").insert(ticketRow);
      if (tErr) {
        console.error("Failed to create ticket registration:", tErr);
        return new Response(JSON.stringify({ error: "Failed to register ticket" }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Prepare Hubtel API request
    const callbackUrl = `${supabaseUrl}/functions/v1/hubtel-callback`;
    const page = ticketRow ? "tickets" : "donate";
    const returnUrl = `https://vivahealthmedfoundation.org/${page}?payment=success`;
    const cancellationUrl = `https://vivahealthmedfoundation.org/${page}?payment=cancelled`;

    const hubtelPayload = {
      totalAmount,
      description: description || "Donation to Viva Health Medical Foundation",
      callbackUrl,
      returnUrl,
      cancellationUrl,
      merchantAccountNumber,
      clientReference,
    };

    console.log("Calling Hubtel API with payload:", hubtelPayload);

    // Log initiate request
    await supabase.from("payment_logs").insert({
      payment_reference: clientReference,
      log_type: "initiate_request",
      request_data: hubtelPayload,
    });

    // Create Basic Auth header
    const authString = btoa(`${hubtelApiId}:${hubtelApiKey}`);

    const hubtelResponse = await fetch("https://payproxyapi.hubtel.com/items/initiate", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${authString}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hubtelPayload),
    });

    const hubtelResult = await hubtelResponse.json();
    console.log("Hubtel API response:", hubtelResult);

    // Log initiate response
    await supabase.from("payment_logs").insert({
      payment_reference: clientReference,
      log_type: "initiate_response",
      response_data: hubtelResult,
      status_code: hubtelResponse.status,
      error_message: hubtelResponse.ok ? null : hubtelResult.message || hubtelResult.description,
    });

    if (!hubtelResponse.ok || hubtelResult.responseCode !== "0000") {
      console.error("Hubtel API error:", hubtelResult);
      
      // Update donation status to failed
      await supabase
        .from("donations")
        .update({ payment_status: "failed" })
        .eq("payment_reference", clientReference);

      return new Response(JSON.stringify({ 
        error: "Failed to initialize payment",
        details: hubtelResult.message || hubtelResult.description 
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Return checkout URL to frontend
    return new Response(JSON.stringify({
      checkoutUrl: hubtelResult.data?.checkoutUrl,
      checkoutId: hubtelResult.data?.checkoutId,
      clientReference,
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Hubtel initiate error:", error);
    return new Response(JSON.stringify({ error: "Failed to initialize payment" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
