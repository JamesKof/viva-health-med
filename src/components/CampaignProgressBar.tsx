import { motion } from "framer-motion";
import { formatGHS, type CampaignProgress } from "@/hooks/useCampaignProgress";
import { cn } from "@/lib/utils";

export function CampaignProgressBar({ progress, light, className }: { progress: CampaignProgress; light?: boolean; className?: string }) {
  const pct = Math.min(100, (progress.raised / progress.goal) * 100);
  const muted = light ? "text-primary-foreground/75" : "text-muted-foreground";
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-end justify-between gap-4 mb-3">
        <div>
          <div className={cn("text-3xl md:text-4xl font-bold", light ? "text-primary-foreground" : "text-primary")}>{formatGHS(progress.raised)}</div>
          <div className={cn("text-sm", muted)}>raised of {formatGHS(progress.goal)} goal</div>
        </div>
        <div className="text-right">
          <div className={cn("text-2xl font-bold", light ? "text-accent" : "text-primary")}>{pct.toFixed(pct < 10 ? 1 : 0)}%</div>
          <div className={cn("text-sm", muted)}>{progress.donorCount.toLocaleString()} donors</div>
        </div>
      </div>
      <div className={cn("h-4 rounded-full overflow-hidden", light ? "bg-primary-foreground/20" : "bg-muted")}
        role="progressbar" aria-valuemin={0} aria-valuemax={progress.goal} aria-valuenow={progress.raised} aria-label="Funds raised">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent to-primary"
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.max(pct, 1.5)}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
