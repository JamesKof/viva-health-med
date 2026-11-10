import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartPulse, Loader2, CheckCircle2, XCircle, Pill, Stethoscope, Syringe, Hospital, Share2, Link2, Quote, Users } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAnalytics } from "@/hooks/useAnalytics";
import { CampaignProgressBar } from "@/components/CampaignProgressBar";
import { useCampaignProgress, formatGHS } from "@/hooks/useCampaignProgress";
import surgeonPreparing from "@/assets/keta-outreach/surgeon-preparing.jpg";
import surgeryCloseup from "@/assets/keta-outreach/surgery-closeup-bw.jpg";
import nursePreparing from "@/assets/keta-outreach/nurse-preparing.jpg";
import staffPpe from "@/assets/keta-outreach/medical-staff-ppe.jpg";

const PRESETS = [100, 250, 500, 1000, 2500, 10000];
const IMPACT = [
  { icon: Pill, amount: 100, text: "Pain relief and post-surgery medicines for one patient" },
  { icon: Syringe, amount: 500, text: "Sterile surgical supplies for one patient's operation" },
  { icon: Stethoscope, amount: 2500, text: "A complete free surgery — from screening to recovery" },
  { icon: Hospital, amount: 10000, text: "A full day in theatre for a team of volunteer surgeons" },
];

const schema = z.object({
  amount: z.number().min(1, "Minimum gift is GH₵1").max(1000000),
  name: z.string().trim().max(200),
  email: z.string().trim().email("Enter a valid email").max(320),
  phone: z.string().trim().max(30),
  message: z.string().trim().max(280),
});

const TamaleAppeal = () => {
  const progress = useCampaignProgress();
  const [params] = useSearchParams();
  const payment = params.get("payment");
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  const [amount, setAmount] = useState<number>(500);
  const [custom, setCustom] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#give") setTimeout(() => document.getElementById("give")?.scrollIntoView({ behavior: "smooth" }), 400);
  }, []);

  const finalAmount = custom ? Number(custom) : amount;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ amount: finalAmount, ...form });
    if (!parsed.success) {
      toast({ title: "Please check your details", description: parsed.error.errors[0].message, variant: "destructive" });
      return;
    }
    if (!anonymous && parsed.data.name.length < 2) {
      toast({ title: "Add your name", description: "Or tick 'Give anonymously'.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const clientReference = `tamale_${crypto.randomUUID().replace(/-/g, "").slice(0, 24)}`;
      const { data, error } = await supabase.functions.invoke("hubtel-initiate", {
        body: {
          clientReference, totalAmount: parsed.data.amount, email: parsed.data.email,
          donorName: parsed.data.name || "Anonymous", phone: parsed.data.phone || null,
          campaign: "tamale-2026", isAnonymous: anonymous, message: parsed.data.message,
          returnOrigin: window.location.origin,
        },
      });
      if (error || !data?.checkoutUrl) throw new Error("init failed");
      trackEvent("donation_initiated", { campaign: "tamale-2026", value: parsed.data.amount, currency: "GHS" });
      window.location.href = data.checkoutUrl;
    } catch {
      toast({ title: "Payment could not start", description: "Please try again in a moment.", variant: "destructive" });
      setLoading(false);
    }
  };

  const shareUrl = "https://vivahealthmedfoundation.org/tamale-appeal";
  const shareText = "Help Viva Health Medical Foundation bring free surgery to Tamale 💚";

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageSEO
          title="Hope Has a Heartbeat: Free Surgery for Tamale | Viva Health Medical Foundation"
          description="Celebrate our 5th anniversary by helping raise GH₵500,000 for a free surgical outreach in Tamale, following our life-saving Keta outreach."
        />
        <Navbar />

        {/* Hero */}
        <section className="relative bg-primary overflow-hidden">
          <PageHeroBackground />
          <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
            <PageHero className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground font-medium text-sm mb-6">
                <HeartPulse className="w-4 h-4 text-accent" /> 5 Years of Touching Lives · Tamale Surgical Outreach
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Hope Has a Heartbeat: <span className="text-accent">Bring Free Surgery to Tamale</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/85 mb-10">
                Celebrating 5 years of touching lives — help us raise GH₵500,000 so no one in the North has to choose between surgery and survival.
              </p>
              <div className="rounded-2xl bg-primary-foreground/10 backdrop-blur-md p-6 border border-primary-foreground/15 mb-8">
                <CampaignProgressBar progress={progress} light />
              </div>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => document.getElementById("give")?.scrollIntoView({ behavior: "smooth" })}>
                Give Now
              </Button>
            </PageHero>
          </div>
        </section>

        {/* Status banner */}
        {payment && (
          <div className="container mx-auto px-4 mt-8">
            {payment === "success" ? (
              <div className="flex items-start gap-3 p-5 rounded-xl bg-primary/10 text-foreground"><CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <p><strong>Thank you for your gift.</strong> Once Hubtel confirms your payment it will appear in the total below. You've just become part of someone's recovery story.</p></div>
            ) : (
              <div className="flex items-start gap-3 p-5 rounded-xl bg-destructive/10 text-foreground"><XCircle className="w-6 h-6 text-destructive shrink-0" />
                <p>Your payment was cancelled — nothing was charged. You can try again whenever you're ready.</p></div>
            )}
          </div>
        )}

        {/* Story */}
        <section className="py-20">
          <div className="container mx-auto px-4 grid lg:grid-cols-5 gap-12 items-start">
            <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-3 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p className="text-sm uppercase tracking-widest text-primary font-semibold">Their story</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Some pain should never have to wait.</h2>
              <p>In the quiet towns and farming villages around Tamale, there are mothers who have carried a growing hernia for years. Fathers who stopped going to the farm because a goitre makes it hard to breathe. Children whose small, treatable conditions are slowly becoming lifelong ones.</p>
              <p>It is not that they do not want care. It is that a single operation can cost more than a family earns in a year. When the choice is between surgery and school fees, between a hospital bill and food on the table, love chooses the children — and the pain stays.</p>
              <p>For many, the nearest well-equipped theatre is hours away on rough roads. Clinics run short of surgeons, of beds, of sterile supplies, sometimes even of light and clean water. Conditions that take an hour to fix become years of suffering, and too often, lives cut short.</p>
              <blockquote className="border-l-4 border-accent pl-5 italic text-foreground">"Healthcare should not depend on where you were born or what is in your pocket."</blockquote>
              <p>As Viva Health Medical Foundation turns five, we don't want to simply celebrate. We want to <strong className="text-foreground">give life back</strong>. With your help, our volunteer surgeons, nurses and pharmacists will travel to Tamale to provide free surgeries, medicines and follow-up care to the people who have waited the longest.</p>
              <p className="text-foreground font-medium">You may never meet them. But they will never forget what you did. Whatever you can give — it is someone's tomorrow.</p>
            </motion.article>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 lg:sticky lg:top-28">
              <img src={surgeonPreparing} alt="A volunteer surgeon preparing for an operation at the Keta outreach" loading="lazy" className="rounded-3xl shadow-lifted w-full aspect-[4/5] object-cover" />
            </motion.div>
          </div>
        </section>

        {/* Keta proof */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mb-10">
              <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-2">Proof that it works</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">We've done it before — in Keta.</h2>
              <p className="text-muted-foreground text-lg">In Keta, our volunteer teams set up theatres, screened families and performed free surgeries for people who had been living with pain for years. Lives were saved, and families went home whole. Tamale is next — and this time, you can be part of the team.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { src: surgeryCloseup, alt: "Close-up of surgeons operating at the Keta outreach" },
                { src: nursePreparing, alt: "A nurse preparing a patient for surgery in Keta" },
                { src: staffPpe, alt: "Medical staff in protective gear during the Keta outreach" },
              ].map((img, i) => (
                <motion.img key={i} src={img.src} alt={img.alt} loading="lazy"
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="rounded-2xl w-full aspect-[4/3] object-cover shadow-soft hover:scale-[1.02] transition-transform" />
              ))}
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What your gift does</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {IMPACT.map(({ icon: Icon, amount: a, text }, i) => (
                <motion.button key={a} type="button" onClick={() => { setAmount(a); setCustom(""); document.getElementById("give")?.scrollIntoView({ behavior: "smooth" }); }}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="text-left p-6 rounded-2xl border bg-card hover:border-primary hover:shadow-soft transition-all">
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <div className="text-2xl font-bold text-primary mb-2">{formatGHS(a)}</div>
                  <p className="text-muted-foreground">{text}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Give form + donors */}
        <section id="give" className="py-20 bg-primary/5 scroll-mt-24">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12">
            <form onSubmit={submit} className="bg-card rounded-3xl p-6 md:p-8 shadow-lifted space-y-5">
              <h2 className="text-2xl md:text-3xl font-bold">Give the gift of surgery</h2>
              <div className="grid grid-cols-3 gap-3">
                {PRESETS.map((p) => (
                  <Button key={p} type="button" variant={!custom && amount === p ? "default" : "outline"} onClick={() => { setAmount(p); setCustom(""); }}>
                    {formatGHS(p)}
                  </Button>
                ))}
              </div>
              <div><Label htmlFor="custom">Or enter your own amount (GH₵)</Label>
                <Input id="custom" type="number" min={1} inputMode="decimal" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="e.g. 750" /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label htmlFor="name">Full name</Label><Input id="name" value={form.name} disabled={anonymous} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={200} /></div>
                <div><Label htmlFor="phone">Phone</Label><Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={30} /></div>
              </div>
              <div><Label htmlFor="email">Email (for your receipt)</Label><Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={320} /></div>
              <div><Label htmlFor="message">Message of hope (optional)</Label><Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={280} rows={3} /></div>
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox checked={anonymous} onCheckedChange={(v) => setAnonymous(v === true)} className="mt-1" />
                <span><strong>Give anonymously</strong><span className="block text-sm text-muted-foreground">Your name won't appear on the Wall of Hope. Your gift still counts toward the total.</span></span>
              </label>
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Donate {finalAmount > 0 ? formatGHS(finalAmount) : ""} with Hubtel</>}
              </Button>
              <p className="text-xs text-muted-foreground text-center">Secure one-time payment via Hubtel · Mobile Money & cards accepted</p>
            </form>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2"><Users className="w-7 h-7 text-primary" /> Wall of Hope</h2>
              <p className="text-muted-foreground mb-6">
                {progress.donorCount === 0 ? "Be the first to give — your name could lead the way." :
                  `${progress.donorCount} generous ${progress.donorCount === 1 ? "person has" : "people have"} given${progress.anonymousCount ? `, including ${progress.anonymousCount} anonymous friend${progress.anonymousCount === 1 ? "" : "s"}` : ""}.`}
              </p>
              <div className="space-y-3 max-h-[560px] overflow-y-auto pr-2">
                {progress.donors.map((d, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    className="p-4 rounded-xl bg-card border flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">{d.name.charAt(0).toUpperCase()}</div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2"><span className="font-semibold">{d.name}</span>
                        <span className="text-primary font-semibold">{formatGHS(d.amount)}</span>
                        <span className="text-xs text-muted-foreground">{new Date(d.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span></div>
                      {d.message && <p className="text-sm text-muted-foreground mt-1 flex gap-1"><Quote className="w-3 h-3 shrink-0 mt-1" />{d.message}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="py-20 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Five years of hope. One more journey north.</h2>
            <p className="text-primary-foreground/85 text-lg mb-8">Give today, then share this page — every share could reach someone who can help a family in Tamale heal.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => document.getElementById("give")?.scrollIntoView({ behavior: "smooth" })}>Give Now</Button>
              <Button asChild variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                <a href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`} target="_blank" rel="noopener noreferrer"><Share2 className="w-4 h-4 mr-2" />WhatsApp</a></Button>
              <Button asChild variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">Facebook</a></Button>
              <Button asChild variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">X</a></Button>
              <Button variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => { navigator.clipboard.writeText(shareUrl); toast({ title: "Link copied" }); }}><Link2 className="w-4 h-4 mr-2" />Copy link</Button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default TamaleAppeal;
