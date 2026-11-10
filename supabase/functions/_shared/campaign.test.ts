import { describe, it, expect } from "vitest";
import { summarizeCampaign, CAMPAIGN_GOAL } from "./campaign";

describe("Tamale campaign summary", () => {
  const rows = [
    { donor_name: "Ama Mensah", amount: 1000, is_anonymous: false, message: null, created_at: "2026-11-10T08:00:00Z" },
    { donor_name: "Secret Kofi", amount: 4000, is_anonymous: true, message: "hi", created_at: "2026-11-10T09:00:00Z" },
  ];
  it("goal is GH₵500,000", () => expect(CAMPAIGN_GOAL).toBe(500000));
  it("counts anonymous gifts in the total", () => {
    const s = summarizeCampaign(rows);
    expect(s.raised).toBe(5000);
    expect(s.donorCount).toBe(2);
  });
  it("hides anonymous donors from the public list", () => {
    const s = summarizeCampaign(rows);
    expect(s.donors.map((d) => d.name)).toEqual(["Ama Mensah"]);
    expect(JSON.stringify(s)).not.toContain("Secret Kofi");
  });
});
