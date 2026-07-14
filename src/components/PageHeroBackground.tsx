import vivaSmile from "@/assets/vivasmile.jpeg.asset.json";

/**
 * Absolute-positioned background used inside page hero sections.
 * Renders the community portrait with a green overlay so navbar text stays readable.
 * Parent section must be `relative` and its content wrapped with `relative z-10`.
 */
interface PageHeroBackgroundProps {
  /** Set true for the first hero on the page (LCP). Defaults to true. */
  priority?: boolean;
}

/**
 * Absolute-positioned background used inside page hero sections.
 * - `priority` heroes preload eagerly with high fetch priority (LCP-optimized).
 * - Non-priority instances lazy-load and decode async.
 * - `sizes` hints the browser it always occupies the viewport width.
 */
export const PageHeroBackground = ({ priority = true }: PageHeroBackgroundProps) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <img
      src={vivaSmile.url}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      // @ts-expect-error - fetchpriority is a valid HTML attribute not yet in React types
      fetchpriority={priority ? "high" : "low"}
      sizes="100vw"
      width={1600}
      height={900}
    />
    <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
    <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/70 to-primary/90" />
  </div>
);

export default PageHeroBackground;
