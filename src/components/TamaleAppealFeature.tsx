import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartPulse, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CampaignProgressBar } from "@/components/CampaignProgressBar";
import { useCampaignProgress } from "@/hooks/useCampaignProgress";
import surgicalProcedure from "@/assets/keta-outreach/surgical-procedure.jpg";

export function TamaleAppealFeature() {
  const progress = useCampaignProgress();
  return (
    <section className="py-20 bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden shadow-lifted aspect-[4/3]">
          <img src={surgicalProcedure} alt="Volunteer surgeons operating during the Keta free surgical outreach" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-background/90 text-foreground text-xs font-semibold">Keta Outreach — lives saved</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-sm font-medium mb-5">
            <HeartPulse className="w-4 h-4 text-accent" /> 5th Anniversary Appeal · #vivahealth@5
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">Hope Has a Heartbeat: <span className="text-accent">Bring Free Surgery to Tamale</span></h2>
          <p className="text-primary-foreground/85 text-lg mb-8">
            In Keta, free surgery gave mothers, fathers and children their lives back. Now families in the North are waiting.
            Help us raise GH₵500,000 so no one has to choose between surgery and survival.
          </p>
          <CampaignProgressBar progress={progress} light className="mb-8" />
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/tamale-appeal#give">Donate to Tamale</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/tamale-appeal">Read the story <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
