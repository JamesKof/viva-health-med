import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";
import { videos, thumbnailUrl } from "@/data/videos";
import { LazyYouTube } from "@/components/LazyYouTube";
import { FadeInUp } from "@/components/AnimatedSection";


export const FeaturedVideos = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const latest = videos.slice(0, 3);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <FadeInUp>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Play className="w-4 h-4" />
              Latest Videos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Work in <span className="text-primary">Motion</span>
            </h2>
            <p className="text-muted-foreground">
              Watch the newest stories from our outreaches, surgeries and volunteers.
            </p>
          </div>
        </FadeInUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {latest.map((video, i) => (
            <FadeInUp key={video.id} delay={i * 0.1}>
              <article className="rounded-2xl overflow-hidden bg-card shadow-soft card-lift h-full flex flex-col">
                {activeVideo === video.id ? (
                  <div className="aspect-video bg-muted">
                    <LazyYouTube id={video.id} title={video.title} autoplay />
                  </div>

                ) : (
                  <button
                    type="button"
                    className="relative aspect-video group w-full"
                    onClick={() => setActiveVideo(video.id)}
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
                      <span className="w-16 h-16 rounded-full bg-accent flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Play className="w-6 h-6 text-accent-foreground ml-1" />
                      </span>
                    </span>
                  </button>
                )}
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-xs font-medium text-primary mb-2">
                    {video.category} · {video.date}
                  </span>
                  <h3 className="font-semibold text-foreground line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </article>
            </FadeInUp>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/videos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-glow transition-all"
          >
            View all videos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
