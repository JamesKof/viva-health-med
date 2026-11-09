import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

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
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase credentials not configured");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await req.json();
    console.log("Hubtel callback received:", JSON.stringify(data, null, 2));

    // Extract data from Hubtel callback
    const responseCode = data.ResponseCode || data.responseCode;
    const responseData = data.Data || data.data || {};
    const clientReference = responseData.ClientReference || responseData.clientReference;
    const status = responseData.Status || responseData.status;
    const salesInvoiceId = responseData.SalesInvoiceId || responseData.salesInvoiceId;
    const amount = responseData.Amount || responseData.amount;

    if (!clientReference) {
      console.error("ClientReference not found in Hubtel callback data");
      return new Response(JSON.stringify({ error: "ClientReference missing" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Processing payment:", { clientReference, responseCode, status, amount });

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Log callback data
    await supabase.from("payment_logs").insert({
      payment_reference: clientReference,
      log_type: "callback",
      response_data: data,
      status_code: responseCode === "0000" ? 200 : 400,
    });

    // Check if payment was successful
    if (responseCode === "0000" && status === "Success") {
      console.log(`Payment successful for ${clientReference}, Amount: ${amount}, Invoice ID: ${salesInvoiceId}`);

      // Update donation status to paid
      const { data: updatedDonation, error: updateError } = await supabase
        .from("donations")
        .update({
          payment_status: "paid",
          hubtel_invoice_id: salesInvoiceId,
          updated_at: new Date().toISOString(),
        })
        .eq("payment_reference", clientReference)
        .select()
        .single();

      if (updateError) {
        console.error("Failed to update donation status:", updateError);
        return new Response(JSON.stringify({ error: "Failed to update donation" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      console.log(`Donation ${clientReference} marked as paid`);
      await supabase.from("ticket_registrations").update({ payment_status: "paid" }).eq("payment_reference", clientReference);

      // Send thank you email if Resend is configured
      if (resendApiKey && updatedDonation) {
        try {
          const resend = new Resend(resendApiKey);
          const donorName = updatedDonation.donor_name || "Generous Donor";
          const donorEmail = updatedDonation.email;
          const donationAmount = updatedDonation.amount;
          const currency = updatedDonation.currency || "GHS";
          const donationDate = new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          console.log(`Sending thank you email to ${donorEmail}`);

          const emailResponse = await resend.emails.send({
            from: "Viva Health Medical Foundation <onboarding@resend.dev>",
            to: [donorEmail],
            subject: "Thank You for Your Generous Donation! 💚",
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f7f6;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                  <!-- Header -->
                  <div style="background: linear-gradient(135deg, #2d8a4e 0%, #1e6b3a 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Thank You!</h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Your generosity makes a difference</p>
                  </div>
                  
                  <!-- Content -->
                  <div style="padding: 40px 30px;">
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                      Dear ${donorName},
                    </p>
                    
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                      On behalf of everyone at <strong>Viva Health Medical Foundation</strong>, we want to express our heartfelt gratitude for your generous donation. Your support means the world to us and the communities we serve.
                    </p>
                    
                    <!-- Donation Receipt Box -->
                    <div style="background: #f8faf9; border: 1px solid #e0e8e4; border-radius: 12px; padding: 25px; margin: 30px 0;">
                      <h3 style="color: #2d8a4e; margin: 0 0 15px; font-size: 18px;">Donation Receipt</h3>
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="color: #666; padding: 8px 0; font-size: 14px;">Amount:</td>
                          <td style="color: #333; padding: 8px 0; font-size: 14px; text-align: right; font-weight: bold;">${currency} ${donationAmount}</td>
                        </tr>
                        <tr>
                          <td style="color: #666; padding: 8px 0; font-size: 14px;">Date:</td>
                          <td style="color: #333; padding: 8px 0; font-size: 14px; text-align: right;">${donationDate}</td>
                        </tr>
                        <tr>
                          <td style="color: #666; padding: 8px 0; font-size: 14px;">Reference:</td>
                          <td style="color: #333; padding: 8px 0; font-size: 14px; text-align: right; font-family: monospace;">${clientReference}</td>
                        </tr>
                        <tr>
                          <td style="color: #666; padding: 8px 0; font-size: 14px;">Status:</td>
                          <td style="color: #2d8a4e; padding: 8px 0; font-size: 14px; text-align: right; font-weight: bold;">✓ Completed</td>
                        </tr>
                      </table>
                    </div>
                    
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                      Your contribution will directly support:
                    </p>
                    
                    <ul style="color: #333; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0 0 30px;">
                      <li>Free medical screenings for underserved communities</li>
                      <li>Essential medications and healthcare supplies</li>
                      <li>Health education and awareness programs</li>
                      <li>Life-saving surgical interventions</li>
                    </ul>
                    
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                      Together, we are bringing quality healthcare to every community. Thank you for being part of our mission!
                    </p>
                    
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 30px 0 0;">
                      With gratitude,<br>
                      <strong style="color: #2d8a4e;">The Viva Health Medical Foundation Team</strong>
                    </p>
                  </div>
                  
                  <!-- Footer -->
                  <div style="background: #f4f7f6; padding: 25px 30px; text-align: center; border-top: 1px solid #e0e8e4;">
                    <p style="color: #666; font-size: 12px; margin: 0 0 10px;">
                      Viva Health Medical Foundation | Ghana
                    </p>
                    <p style="color: #999; font-size: 11px; margin: 0;">
                      This email serves as your official donation receipt. Please keep it for your records.
                    </p>
                  </div>
                </div>
              </body>
              </html>
            `,
          });

          console.log("Thank you email sent successfully:", emailResponse);
        } catch (emailError) {
          // Log email error but don't fail the callback
          console.error("Failed to send thank you email:", emailError);
        }
      } else {
        console.log("Resend API key not configured or donation data missing, skipping email");
      }
    } else {
      console.log(`Payment failed for ${clientReference}: ${status}`);

      // Update donation status to failed
      const { error: updateError } = await supabase
        .from("donations")
        .update({
          payment_status: "failed",
          updated_at: new Date().toISOString(),
        })
        .eq("payment_reference", clientReference);

      if (updateError) {
        console.error("Failed to update donation status:", updateError);
      }
      await supabase.from("ticket_registrations").update({ payment_status: "failed" }).eq("payment_reference", clientReference);
    }

    // Return success response to Hubtel
    return new Response(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Hubtel callback error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});