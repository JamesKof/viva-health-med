import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, X, Youtube, Camera } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { LazyYouTube } from "@/components/LazyYouTube";
import { PageHeroBackground } from "@/components/PageHeroBackground";
import { PageTransition, PageHero } from "@/components/PageTransition";
import { videos, videoCategories, thumbnailUrl, CHANNEL_URL } from "@/data/videos";
import type { VideoItem } from "@/data/videos";

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/** Converts "December 2025" to an ISO date usable by schema.org uploadDate. */
const toIsoDate = (label: string) => {
  const [month, year] = label.toLowerCase().split(" ");
  const index = MONTHS.indexOf(month);
  if (index < 0 || !year) return undefined;
  return `${year}-${String(index + 1).padStart(2, "0")}-01`;
};

const videoSchema = (video: VideoItem) => ({
  "@type": "VideoObject",
  name: video.title,
  description: `${video.category} — ${video.title} by Viva Health Medical Foundation.`,
  thumbnailUrl: [thumbnailUrl(video.id)],
  uploadDate: toIsoDate(video.date),
  contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
  embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
  publisher: {
    "@type": "Organization",
    name: "Viva Health Medical Foundation",
  },
});

const Videos = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [playing, setPlaying] = useState<VideoItem | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? videos
        : videos.filter((v) => v.category === activeCategory),
    [activeCategory]
  );

  const featured = videos[0];

  const jsonLd = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        ...videoSchema(featured),
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `Viva Health Medical Foundation videos — ${activeCategory}`,
        itemListElement: filtered.map((video, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: videoSchema(video),
        })),
      },
    ],
    [featured, filtered, activeCategory]
  );

  // Keyboard controls + focus trapping for the lightbox
  useEffect(() => {
    if (!playing) return;

    lastFocused.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setPlaying(null);
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      lastFocused.current?.focus?.();
    };
  }, [playing]);

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageSEO
          title="Videos | Viva Health Medical Foundation"
          description="Watch outreach films, Keta surgery documentaries and volunteer stories from Viva Health Medical Foundation in Ghana."
          canonical="https://vivahealthmedfoundation.org/videos"
          image={thumbnailUrl(featured.id)}
          type="video.other"
          jsonLd={jsonLd}
        />
        <Navbar />

        {/* Hero */}
        <section className="pt-24 pb-8 bg-primary overflow-hidden">
          <div className="relative h-[50vh] overflow-hidden">
            <PageHeroBackground />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="container mx-auto">
                <PageHero>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground font-medium text-sm mb-4">
                    <Play className="w-4 h-4" />
                    Video Gallery
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                    Stories in Motion
                  </h1>
                </PageHero>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery sub-menu */}
        <section className="py-4 border-b border-border bg-background">
          <div className="container mx-auto px-4 flex flex-wrap items-center gap-3">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground hover:bg-primary/10 transition-colors"
            >
              <Camera className="w-4 h-4" />
              Photos
            </Link>
            <Link
              to="/videos"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground shadow-glow"
            >
              <Play className="w-4 h-4" />
              Videos
            </Link>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border border-border text-foreground hover:bg-secondary transition-colors"
            >
              <Youtube className="w-4 h-4" />
              YouTube Channel
            </a>
          </div>
        </section>

        {/* Featured video */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lifted bg-card">
                <div className="aspect-video">
                  <LazyYouTube id={featured.id} title={featured.title} />
                </div>
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                  Latest release · {featured.date}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground">
                  Follow our medical teams into the communities we serve — free
                  screenings, surgeries and health education delivered where care
                  is hardest to reach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="pb-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3">
              {videoCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((video, index) => (
                <motion.article
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                  className="rounded-2xl overflow-hidden bg-card shadow-soft card-lift flex flex-col"
                >
                  <button
                    type="button"
                    className="relative aspect-video group"
                    onClick={() => setPlaying(video)}
                    aria-label={`Play ${video.title}`}
                  >
                    <img
                      src={thumbnailUrl(video.id)}
                      alt={video.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-foreground/25 group-hover:bg-foreground/35 transition-colors" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-14 h-14 rounded-full bg-accent flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Play className="w-5 h-5 text-accent-foreground ml-0.5" />
                      </span>
                    </span>
                  </button>
                  <div className="p-5 flex-1 flex flex-col">
                    <span className="text-xs font-medium text-primary mb-2">
                      {video.category} · {video.date}
                    </span>
                    <h3 className="font-semibold text-foreground line-clamp-2">
                      {video.title}
                    </h3>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox player */}
        {playing && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm animate-fade-in p-4"
            onClick={() => setPlaying(null)}
            role="dialog"
            aria-modal="true"
            aria-label={playing.title}
          >
            <div ref={dialogRef} className="contents">
              <button
                ref={closeButtonRef}
                className="absolute top-6 right-6 p-2 rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors"
                onClick={() => setPlaying(null)}
                aria-label="Close video"
              >
                <X className="w-6 h-6" />
              </button>
              <div
                className="w-full max-w-5xl animate-scale-in"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lifted bg-muted">
                  <LazyYouTube id={playing.id} title={playing.title} autoplay />
                </div>
                <h3 className="mt-4 text-center text-lg font-semibold text-background">
                  {playing.title}
                </h3>
                <p className="mt-1 text-center text-xs text-background/70">
                  Press Esc to close
                </p>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Videos;
