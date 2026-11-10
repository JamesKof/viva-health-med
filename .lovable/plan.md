# Tamale Surgical Outreach Donation Drive

## Page heading
**"Hope Has a Heartbeat: Bring Free Surgery to Tamale"**
Sub-heading: "Celebrating 5 years of touching lives — help us raise GH₵500,000 so no one in the North has to choose between surgery and survival."

New page at `/tamale-appeal`, linked under Donate in the menu and featured on the homepage.

## Page sections
1. **Hero** — green header (site standard) with the heading, a large live progress bar (raised vs GH₵500,000, % funded, donor count) and a "Give Now" button.
2. **The story** — warm, moving storytelling: families in the North who live with treatable conditions (hernias, goitres, growths) because surgery costs more than a year's income, long journeys to distant hospitals, too few theatres, surgeons and supplies. Ends with a gentle, hopeful appeal.
3. **Proof it works: Keta** — what the Keta outreach achieved, using Keta photos (surgery in progress, surgeons preparing, team briefing, doctor with patient), shown as an animated photo strip. Only Keta photos not already used in the homepage feature, so no photo repeats.
4. **What your gift does** — impact amounts (e.g. GH₵100 medicines, GH₵500 a patient's surgical supplies, GH₵2,500 a full surgery, GH₵10,000 a theatre day). I'll write these figures myself as suggestions; please send the real costs.
5. **Donate form** — amount presets plus a custom amount, name, email, phone, optional message, and an **"Give anonymously"** checkbox. Pays through the existing Hubtel single-payment flow (no recurring payments).
6. **Wall of donors** — public list of confirmed donors who chose to be named (name, amount, message, date). Anonymous donors appear only as "Anonymous Friend" without a name, or are counted in the total only. Only payments Hubtel confirms are shown.
7. **Closing appeal** — final call to give, plus share buttons (WhatsApp, Facebook, X, copy link).

## Homepage feature
A new "5th Anniversary Appeal" band below the hero: one Keta photo, the heading, a short appeal, the live progress bar, and "Donate to Tamale" / "Read the story" buttons.

## Technical details
- Database: add `campaign`, `is_anonymous`, `message` columns to `donations` (all optional/defaulted, no breaking changes).
- `hubtel-initiate`: accept `campaign: "tamale-2026"`, `isAnonymous`, `message` (validated, message max 280 chars); return URL goes to `/tamale-appeal?payment=...`.
- New public edge function `campaign-progress`: returns total raised, donor count and the recent named donors list for paid donations only — never emails, phones or names of anonymous donors (donations table stays private).
- Progress bar polls this every 60s; animated with framer-motion.
- Fixed goal of GH₵500,000 in a shared constant; a test checks the percentage maths and that anonymous donors' names are hidden.
- PageSEO with title/description/OG for sharing.

## Questions to confirm later (won't block the build)
- Real outreach date and venue in Tamale, and real per-surgery costs.
- Should Ecobank bank transfers be counted? Only Hubtel payments are counted automatically.
