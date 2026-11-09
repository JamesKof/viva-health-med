import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { ticketAccessToken, verifiedTicketPayment } from "../_shared/ticket-access.ts";

Deno.serve(async req => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" } });
  if (req.method !== "POST") return reply({ error: "Method not allowed" }, 405);
  try {
    const { reference, access } = await req.json();
    if (typeof reference !== "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(reference) || typeof access !== "string" || !/^[a-f0-9]{64}$/.test(access)) return reply({ error: "Invalid ticket access" }, 400);
    const secret = Deno.env.get("HUBTEL_API_KEY");
    const apiId = Deno.env.get("HUBTEL_API_ID");
    const merchant = Deno.env.get("HUBTEL_MERCHANT_ACCOUNT_NUMBER");
    const url = Deno.env.get("SUPABASE_URL");
    const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!secret || !apiId || !merchant || !url || !service) return reply({ error: "Payment service unavailable" }, 503);
    const expected = await ticketAccessToken(reference, secret);
    let difference = 0;
    for (let i = 0; i < expected.length; i++) difference |= expected.charCodeAt(i) ^ access.charCodeAt(i);
    if (difference !== 0) return reply({ error: "Ticket access denied" }, 403);
    const db = createClient(url, service);
    const { data: registration, error } = await db.from("ticket_registrations").select("payment_reference,tier,quantity,total_amount,full_name,created_at").eq("payment_reference", reference).single();
    if (error || !registration) return reply({ error: "Ticket not found" }, 404);
    const response = await fetch(`https://rmsc.hubtel.com/v1/merchantaccount/merchants/${merchant}/transactions/status?clientReference=${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Basic ${btoa(`${apiId}:${secret}`)}` }, signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return reply({ status: "pending", message: "Payment confirmation is not available yet. Please check again." });
    const result = await response.json();
    await db.from("payment_logs").insert({ payment_reference: reference, log_type: "verification", response_data: result, status_code: response.status });
    const transactions = Array.isArray(result.Data) ? result.Data : [];
    const transaction = transactions.find((t: Record<string, unknown>) => verifiedTicketPayment(t, reference, Number(registration.total_amount)));
    if (result.ResponseCode !== "0000" || !transaction) {
      const failed = transactions.some((t: Record<string, unknown>) => t.ClientReference === reference && t.TransactionStatus === "Failed");
      return reply({ status: failed ? "failed" : "pending" });
    }
    const updates = await Promise.all([
      db.from("ticket_registrations").update({ payment_status: "paid" }).eq("payment_reference", reference),
      db.from("donations").update({ payment_status: "paid", hubtel_invoice_id: transaction.TransactionId }).eq("payment_reference", reference),
    ]);
    if (updates.some(update => update.error)) return reply({ error: "Unable to save payment confirmation. Please check again." }, 503);
    return reply({ status: "paid", ticket: { ...registration, amount_paid: Number(registration.total_amount), currency: "GHS", payment_status: "paid" } });
  } catch {
    return reply({ error: "Unable to check payment right now. Please try again." }, 503);
  }
});