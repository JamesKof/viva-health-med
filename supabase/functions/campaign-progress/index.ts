import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { summarizeCampaign } from "../_shared/campaign.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data, error } = await supabase
      .from("donations")
      .select("donor_name, amount, is_anonymous, message, created_at")
      .eq("campaign", "tamale-2026")
      .eq("payment_status", "paid");
    if (error) throw error;
    return new Response(JSON.stringify(summarizeCampaign(data ?? [])), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=30" },
    });
  } catch (e) {
    console.error("campaign-progress error", e);
    return new Response(JSON.stringify({ error: "Could not load progress" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
