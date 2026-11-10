import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const TAMALE_GOAL = 500000;

export interface CampaignDonor { name: string; amount: number; message: string | null; date: string }
export interface CampaignProgress { goal: number; raised: number; donorCount: number; anonymousCount: number; donors: CampaignDonor[] }

export function useCampaignProgress() {
  const [data, setData] = useState<CampaignProgress | null>(null);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      const { data, error } = await supabase.functions.invoke("campaign-progress", { method: "GET" });
      if (alive && !error && data) setData(data as CampaignProgress);
    };
    load();
    const t = setInterval(load, 60000);
    return () => { alive = false; clearInterval(t); };
  }, []);
  return data ?? { goal: TAMALE_GOAL, raised: 0, donorCount: 0, anonymousCount: 0, donors: [] };
}

export const formatGHS = (n: number) => `GH₵${Math.round(n).toLocaleString("en-GH")}`;
