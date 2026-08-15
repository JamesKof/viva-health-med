import { useEffect } from "react";

interface PageSEOProps {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}='${key}']`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export const PageSEO = ({
  title,
  description,
  canonical,
  image,
  type = "website",
  jsonLd,
}: PageSEOProps) => {
  useEffect(() => {
    const fullTitle = title.includes("Viva Health")
      ? title
      : `${title} | Viva Health Medical Foundation`;
    document.title = fullTitle;

    if (description) {
      upsertMeta("name", "description", description);
      upsertMeta("property", "og:description", description);
      upsertMeta("name", "twitter:description", description);
    }

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:type", type);
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    if (image) {
      upsertMeta("property", "og:image", image);
      upsertMeta("name", "twitter:image", image);
    }

    const canonicalUrl = canonical || window.location.href;
    if (canonicalUrl) {
      let link = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonicalUrl);
      upsertMeta("property", "og:url", canonicalUrl);
    }
  }, [title, description, canonical, image, type]);

  useEffect(() => {
    if (!jsonLd) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-page-seo", "true");
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [jsonLd]);

  return null;
};
