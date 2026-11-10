export const CAMPAIGN_GOAL = 500000;

export interface DonationRow {
  donor_name: string | null;
  amount: number | string;
  is_anonymous: boolean | null;
  message: string | null;
  created_at: string;
}

/** Builds the public summary. Never exposes names of anonymous donors. */
export function summarizeCampaign(rows: DonationRow[]) {
  const raised = rows.reduce((s, r) => s + Number(r.amount || 0), 0);
  const donors = rows
    .filter((r) => !r.is_anonymous)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 60)
    .map((r) => ({
      name: (r.donor_name || "").trim() || "A Friend",
      amount: Number(r.amount),
      message: r.message,
      date: r.created_at,
    }));
  return {
    goal: CAMPAIGN_GOAL,
    raised,
    donorCount: rows.length,
    anonymousCount: rows.filter((r) => r.is_anonymous).length,
    donors,
  };
}
