import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

function abs(path: string): string {
  const root = SITE_URL.replace(/\/$/, "");
  if (path === "/") return `${root}/`;
  return `${root}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "/",
    "/program/",
    "/stats/",
    "/articles/",
    "/faq/",
    "/trainers/numbers/",
    "/trainers/words/",
    "/trainers/order/",
    "/trainers/pairs/",
  ];

  return [
    ...staticPages.map((path) => ({
      url: abs(path),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...ARTICLES.map((a) => ({
      url: abs(`/articles/${a.slug}/`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
