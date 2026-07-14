import vivaSmile from "@/assets/vivasmile.jpeg.asset.json";

/**
 * Absolute-positioned background used inside page hero sections.
 * Renders the community portrait with a green overlay so navbar text stays readable.
 * Parent section must be `relative` and its content wrapped with `relative z-10`.
 */
export const PageHeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <img
      src={vivaSmile.url}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      loading="eager"
    />
    <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
    <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/70 to-primary/90" />
  </div>
);

export default PageHeroBackground;
