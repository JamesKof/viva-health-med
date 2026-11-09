import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Ticket, Check, Loader2, CheckCircle2, XCircle, PartyPopper, Download, FlaskConical } from "lucide-react";
import { z } from "zod";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { PageHeroBackground } from "@/components/PageHeroBackground";
import { PageTransition, PageHero } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAnalytics } from "@/hooks/useAnalytics";
import ticketFlyer from "@/assets/events/ticket-categories.jpeg.asset.json";
import { createTicketPdf, downloadTicket, type PaidTicket } from "@/lib/ticket-pdf";
import { isTestTicketPage, TEST_TICKET_PRICE } from "@/lib/ticket-pricing";

const TEST_TIER = { id: "test", name: "Test Ticket", price: TEST_TICKET_PRICE, quote: "For testing payments only.", seats: "Testing",
  perks: ["Used to test Hubtel payments", "Not a real seat"], accent: "from-emerald-600 to-emerald-900" } as const;

export const TIERS = [
  { id: "supporter", name: "Supporter", price: 500, quote: "I want to be part of the Impact.", seats: "1 Seat",
    perks: ["1 Seat at the dinner", "Dinner & entertainment", "Recognition as a Foundation Supporter"], accent: "from-rose-600 to-rose-900" },
  { id: "champion", name: "Champion", price: 1000, quote: "I want to do a little more.", seats: "1 Seat",
    perks: ["1 Seat", "Dinner & entertainment", "Special Recognition as a Champion", "Name featured among our Supporters"], accent: "from-blue-600 to-blue-900" },
  { id: "impact_maker", name: "Impact Maker", price: 2500, quote: "I want my contribution to create tangible impact.", seats: "2 Seats",
    perks: ["2 Seats", "Recognition as an Impact Partner", "Name/logo featured in selected event materials", "Special appreciation during the evening"], accent: "from-purple-600 to-purple-900" },
  { id: "change_maker", name: "Change Maker", price: 5000, quote: "I want to help drive the work we do.", seats: "4 Seats",
    perks: ["4 Seats", "Prominent recognition during the event", "Logo/name featured in event communications", "Recognition as a Change Maker", "Foundation Impact Update after the event"], accent: "from-zinc-600 to-zinc-900" },
  { id: "legacy_partner", name: "Legacy Partner", price: 10000, quote: "I want to leave a lasting mark.", seats: "Table for 10",
    perks: ["Reserved Table for 10", "Highest-level Donor Recognition", "Prominent branding at the event", "Recognition during the awards ceremony", "Logo/name featured in event communications", "Post-event Impact Report showing how contributions are being utilized"], accent: "from-amber-500 to-amber-800" },
] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(200),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
});

const fmt = (n: number) => `GH₵ ${n.toLocaleString()}`;

const Tickets = () => {
  const [params] = useSearchParams();
  const location = useLocation();
  const testMode = isTestTicketPage(location.pathname, location.search);
  const tiers = testMode ? [TEST_TIER] : TIERS;
  const status = params.get("payment");
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  const [tier, setTier] = useState<string>(testMode ? "test" : "supporter");
  const [qty, setQty] = useState(1);
  const [custom, setCustom] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", organization: "", guests: "" });
  const [loading, setLoading] = useState(false);

  const [paidTicket, setPaidTicket] = useState<PaidTicket | null>(null);
  const [pdf, setPdf] = useState<Blob | null>(null);
  const [checking, setChecking] = useState(false);
  const [confirmation, setConfirmation] = useState("Payment confirmation pending.");
  const [savedAccess] = useState(() => {
    try { return JSON.parse(localStorage.getItem("viva-ticket-checkout") || "null"); } catch { return null; }
  });
  const reference = params.get("reference") || savedAccess?.reference;
  const access = params.get("access") || savedAccess?.access;
  const selected = tiers.find((t) => t.id === tier) ?? tiers[0];
  const unit = tier === "legacy_partner" && Number(custom) > selected.price ? Math.round(Number(custom)) : selected.price;
  const total = unit * qty;

  useEffect(() => { setTier(testMode ? "test" : "supporter"); setQty(1); }, [testMode]);

  const checkPayment = async () => {
    if (!reference || !access) { setConfirmation("No payment to check yet. Register and pay below."); return; }
    setChecking(true);
    try {
      const { data, error } = await supabase.functions.invoke("ticket-status", { body: { reference, access } });
      if (error || data?.error) throw new Error("Payment check unavailable");
      if (data.status === "paid" && data.ticket) {
        setPaidTicket(data.ticket);
        setPdf(await createTicketPdf(data.ticket));
        setConfirmation("Payment confirmed. Your ticket is ready.");
      } else {
        setConfirmation(data.status === "failed" ? "Payment was not completed. You can try again below." : "Waiting for Hubtel to confirm payment. Please check again shortly.");
      }
    } catch {
      setConfirmation("Unable to confirm payment right now. Please check again shortly.");
    } finally { setChecking(false); }
  };

  useEffect(() => {
    if (!reference || !access || status === "cancelled") return;
    void checkPayment();
    const interval = window.setInterval(() => { void checkPayment(); }, 20000);
    return () => window.clearInterval(interval);
  }, [reference, access, status]);

  const choose = (id: string) => {
    setTier(id);
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({ title: "Please check your details", description: parsed.error.errors[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const clientReference = `ticket_${crypto.randomUUID()}`;
      const { data, error } = await supabase.functions.invoke("hubtel-initiate", {
        body: {
          totalAmount: total, clientReference, email: parsed.data.email, donorName: parsed.data.name, phone: parsed.data.phone,
          ticket: { tier, quantity: qty, customAmount: tier === "legacy_partner" ? unit : undefined, organization: form.organization, guestNames: form.guests },
          returnOrigin: window.location.origin,
        },
      });
      if (error || !data?.checkoutUrl) throw new Error(data?.error || "Could not start payment");
      if (data.accessToken) localStorage.setItem("viva-ticket-checkout", JSON.stringify({ reference: clientReference, access: data.accessToken }));
      trackEvent("ticket_checkout_opened", { tier, quantity: qty, amount: total });
      window.location.href = data.checkoutUrl;
    } catch (err) {
      toast({ title: "Payment could not start", description: "Please try again or contact us on WhatsApp.", variant: "destructive" });
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageSEO title="5th Anniversary Dinner Tickets" description="Buy tickets and register for the VivaHealth Medical Foundation 5th Anniversary Dinner. Choose from Supporter to Legacy Partner." />
        <Navbar />
        <section className="relative min-h-[50vh] flex items-center bg-primary overflow-hidden">
          <PageHeroBackground />
          <div className="container mx-auto px-4 relative z-10 py-32">
            <PageHero className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground font-medium text-sm mb-6">
                <PartyPopper className="w-4 h-4" /> #vivahealth@5
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                {testMode ? "GH₵1 Test Ticket" : <>5th Anniversary <span className="text-accent">Dinner Tickets</span></>}
              </h1>
              <p className="text-lg text-primary-foreground/80">
                {testMode ? "Payment test only — not valid for event admission." : "Celebrating Excellence, Purpose, and Dedication. Reserve your seat and help us keep touching lives and widening smiles."}
              </p>
            </PageHero>
          </div>
        </section>

        {(status || reference) && (
          <div className="container mx-auto px-4 pt-10">
            <div className={`flex items-start gap-3 rounded-xl border p-5 ${status === "success" ? "border-primary bg-primary/5" : "border-destructive bg-destructive/5"}`}>
              {paidTicket ? <CheckCircle2 className="w-6 h-6 text-primary shrink-0" /> : status === "cancelled" ? <XCircle className="w-6 h-6 text-destructive shrink-0" /> : <Ticket className="w-6 h-6 text-primary shrink-0" />}
              <div>
                <p className="font-semibold" role="status">{status === "cancelled" && !paidTicket ? "Checkout was cancelled. You can check payment status or try again." : confirmation}</p>
                {paidTicket && <p className="text-sm text-muted-foreground mt-2">{paidTicket.full_name} · {fmt(paidTicket.amount_paid)} paid · {paidTicket.quantity} ticket(s)</p>}
                <div className="flex flex-wrap gap-3 mt-4">
                  {pdf && paidTicket ? <Button onClick={() => void downloadTicket(pdf, `VivaHealth-ticket-${paidTicket.payment_reference}.pdf`)}><Download className="w-4 h-4 mr-2" />Download Ticket PDF</Button> : <Button disabled={checking || !reference || !access} onClick={() => void checkPayment()}>{checking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}Check payment status</Button>}
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="py-16">
          <div className="container mx-auto px-4">
            {!testMode && <div className="flex justify-center mb-8"><Button variant="outline" asChild><Link to="/test-ticket"><FlaskConical className="w-4 h-4 mr-2" />GH₵1 Test Ticket</Link></Button></div>}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">{testMode ? "Test Payment" : "Ticket Categories"}</h2>
            <p className="text-center text-muted-foreground mb-12">{testMode ? "GH₵1 per test ticket" : "Choose the level that fits how you want to make an impact."}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tiers.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl overflow-hidden border bg-card shadow-sm flex flex-col ${tier === t.id ? "ring-2 ring-primary" : ""}`}>
                  <div className={`bg-gradient-to-br ${t.accent} p-6 text-primary-foreground`}>
                    <p className="text-xs uppercase tracking-widest opacity-80">{t.seats}</p>
                    <h3 className="text-2xl font-bold mt-1">{t.name}</h3>
                    <p className="text-sm italic opacity-90 mt-1">“{t.quote}”</p>
                    <p className="text-3xl font-extrabold mt-4">{fmt(t.price)}{t.id === "legacy_partner" && "+"}</p>
                  </div>
                  <ul className="p-6 space-y-2 flex-1">
                    {t.perks.map((p) => (
                      <li key={p} className="flex gap-2 text-sm"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{p}</li>
                    ))}
                  </ul>
                  <div className="p-6 pt-0">
                    <Button className="w-full" variant={tier === t.id ? "default" : "outline"} onClick={() => choose(t.id)}>
                      <Ticket className="w-4 h-4 mr-2" /> {tier === t.id ? "Selected" : `Choose ${t.name}`}
                    </Button>
                  </div>
                </motion.div>
              ))}
              {!testMode && <div className="rounded-2xl overflow-hidden border hidden lg:block">
                <img src={ticketFlyer.url} alt="Ticket categories flyer" className="w-full h-full object-cover" loading="lazy" />
              </div>}
            </div>
          </div>
        </section>

        <section id="register" className="py-16 bg-secondary/50 scroll-mt-24">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl font-bold text-center mb-2">Register & Pay</h2>
            <p className="text-center text-muted-foreground mb-8">Secure payment by Hubtel — Mobile Money or card.</p>
            <form onSubmit={submit} className="bg-card rounded-2xl border p-6 md:p-8 space-y-5 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ticket category</Label>
                  <select value={tier} onChange={(e) => setTier(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                    {tiers.map((t) => <option key={t.id} value={t.id}>{t.name} — {fmt(t.price)}{t.id === "legacy_partner" ? "+" : ""}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Number of tickets</Label>
                  <Input type="number" min={1} max={20} value={qty} onChange={(e) => setQty(Math.max(1, Math.min(20, Number(e.target.value) || 1)))} />
                </div>
              </div>
              {tier === "legacy_partner" && (
                <div className="space-y-2">
                  <Label>Contribution per table (min GH₵ 10,000)</Label>
                  <Input type="number" min={10000} placeholder="10000" value={custom} onChange={(e) => setCustom(e.target.value)} />
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="ticket-name">Full name *</Label><Input id="ticket-name" required maxLength={200} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div className="space-y-2"><Label htmlFor="ticket-phone">Phone *</Label><Input id="ticket-phone" required maxLength={30} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="ticket-email">Email *</Label><Input id="ticket-email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                <div className="space-y-2"><Label>Organization (optional)</Label><Input maxLength={200} value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} /></div>
              </div>
              <div className="space-y-2">
                <Label>Guest names (optional)</Label>
                <Textarea maxLength={1000} placeholder="Names of others attending with you" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                <span className="text-sm text-muted-foreground">{selected.name} × {qty}</span>
                <span className="text-2xl font-bold text-primary">{fmt(total)}</span>
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Ticket className="w-4 h-4 mr-2" />}
                Pay {fmt(total)} with Hubtel
              </Button>
            </form>
          </div>
        </section>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default Tickets;
