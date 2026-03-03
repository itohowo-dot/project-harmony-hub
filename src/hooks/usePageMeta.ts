import { useEffect } from "react";

const SITE_NAME = "BitHive";
const DEFAULT_TITLE = "BitHive — Fund the Future with Bitcoin";
const DEFAULT_DESCRIPTION = "Discover and back Bitcoin-powered campaigns on BitHive. Crowdfund the future with sBTC.";
const DEFAULT_IMAGE = "/placeholder.svg";

interface PageMeta {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

function setMetaTag(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setNameMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function usePageMeta({ title, description, image, url }: PageMeta = {}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const desc = description || DEFAULT_DESCRIPTION;
  const img = image || DEFAULT_IMAGE;
  const pageUrl = url || window.location.href;

  useEffect(() => {
    document.title = fullTitle;

    // Open Graph
    setMetaTag("og:title", fullTitle);
    setMetaTag("og:description", desc);
    setMetaTag("og:image", img);
    setMetaTag("og:url", pageUrl);
    setMetaTag("og:type", "website");
    setMetaTag("og:site_name", SITE_NAME);

    // Twitter Card
    setNameMeta("twitter:card", "summary_large_image");
    setNameMeta("twitter:title", fullTitle);
    setNameMeta("twitter:description", desc);
    setNameMeta("twitter:image", img);

    // Description
    setNameMeta("description", desc);

    return () => {
      document.title = DEFAULT_TITLE;
      setMetaTag("og:title", DEFAULT_TITLE);
      setMetaTag("og:description", DEFAULT_DESCRIPTION);
      setMetaTag("og:image", DEFAULT_IMAGE);
      setMetaTag("og:url", window.location.href);
      setNameMeta("twitter:title", DEFAULT_TITLE);
      setNameMeta("twitter:description", DEFAULT_DESCRIPTION);
      setNameMeta("twitter:image", DEFAULT_IMAGE);
      setNameMeta("description", DEFAULT_DESCRIPTION);
    };
  }, [fullTitle, desc, img, pageUrl]);
}
