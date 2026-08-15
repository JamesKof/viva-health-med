import { useEffect, useRef, useState } from "react";
import { thumbnailUrl } from "@/data/videos";

interface LazyYouTubeProps {
  id: string;
  title: string;
  autoplay?: boolean;
  className?: string;
}

/**
 * Mounts the privacy-friendly YouTube iframe only once the container is
 * visible in the viewport, showing a thumbnail/skeleton until the stream loads.
 */
export const LazyYouTube = ({
  id,
  title,
  autoplay = false,
  className = "",
}: LazyYouTubeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    ...(autoplay ? { autoplay: "1" } : {}),
  });

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 overflow-hidden bg-muted">
          <img
            src={thumbnailUrl(id)}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full h-full object-cover opacity-40 blur-[2px]"
          />
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          <span className="sr-only">Loading video…</span>
        </div>
      )}
      {inView && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`}
          title={title}
          className="relative w-full h-full"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};
