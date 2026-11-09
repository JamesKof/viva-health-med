import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Ticket, MessageCircle, PartyPopper } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import anniversary from "@/assets/events/anniversary-5th.jpeg.asset.json";
import tickets from "@/assets/events/ticket-categories.jpeg.asset.json";

const DURATION = 60;
const KEY = "viva-anniversary-popup-seen";
const slides = [
  { src: anniversary.url, label: "5th Anniversary", alt: "VivaHealth Medical Foundation 5th Anniversary logo launch" },
  { src: tickets.url, label: "Ticket Categories", alt: "Anniversary dinner ticket categories from Ghc 500 to Ghc 10k+" },
];
const WA = `https://wa.me/233530839578?text=${encodeURIComponent("Hello VivaHealth, I would like to reserve 5th Anniversary Dinner Tickets.")}`;

export const AnniversaryPopup = () => {
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [left, setLeft] = useState(DURATION);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/admin") || sessionStorage.getItem(KEY)) return;
    const t = setTimeout(() => setOpen(true), 1000);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const close = useCallback(() => {
    setOpen(false);
    sessionStorage.setItem(KEY, "1");
  }, []);

  const reopen = () => { setLeft(DURATION); setSlide(0); setOpen(true); };

  useEffect(() => {
    if (!open) return;
    const i = setInterval(() => setLeft((s) => (s <= 1 ? 0 : s - 1)), 1000);
    const rot = setInterval(() => setSlide((s) => (s + 1) % 2), 12000);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setSlide((s) => (s + 1) % 2);
      if (e.key === "ArrowLeft") setSlide((s) => (s + 1) % 2);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { clearInterval(i); clearInterval(rot); window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, close]);

  useEffect(() => { if (open && left === 0) close(); }, [left, open, close]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-foreground/70 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close} role="dialog" aria-modal="true" aria-label="VivaHealth 5th Anniversary announcement"
          >
            <motion.div
              className="relative w-full max-w-md sm:max-w-lg bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
              initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-1 bg-muted">
                <motion.div className="h-full bg-primary" initial={{ width: "100%" }} animate={{ width: "0%" }} transition={{ duration: DURATION, ease: "linear" }} />
              </div>

              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
                <div className="flex gap-1 bg-muted rounded-full p-1">
                  {slides.map((s, i) => (
                    <button key={s.label} onClick={() => setSlide(i)}
                      className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${slide === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                      {s.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground tabular-nums">Closes in {left}s</span>
                  <button onClick={close} aria-label="Close" className="p-1.5 rounded-full hover:bg-muted transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 min-h-0 bg-muted overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img key={slide} src={slides[slide].src} alt={slides[slide].alt}
                    className="w-full h-full max-h-[62vh] object-contain mx-auto"
                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }} />
                </AnimatePresence>
                {[ChevronLeft, ChevronRight].map((Icon, i) => (
                  <button key={i} onClick={() => setSlide((s) => (s + 1) % 2)} aria-label={i ? "Next" : "Previous"}
                    className={`absolute top-1/2 -translate-y-1/2 ${i ? "right-2" : "left-2"} p-2 rounded-full bg-background/80 hover:bg-background shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>

              <div className="p-4 grid grid-cols-2 gap-2 border-t border-border">
                <Link to="/donate" onClick={close}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 text-sm hover:opacity-90 transition-opacity">
                  <Ticket className="w-4 h-4" /> Get Tickets
                </Link>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg border border-primary text-primary font-semibold py-2.5 text-sm hover:bg-primary/10 transition-colors">
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && !pathname.startsWith("/admin") && (
        <motion.button onClick={reopen} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-6 left-4 z-40 flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold shadow-lg hover:scale-105 transition-transform">
          <PartyPopper className="w-4 h-4" /> 5th Anniversary Tickets
        </motion.button>
      )}
    </>
  );
};
