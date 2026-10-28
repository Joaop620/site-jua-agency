import type { MetadataRoute } from "next";
import { projects, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/privacidade`, changeFrequency: "yearly", priority: 0.2 },
    ...projects.map((p) => ({ url: `${site.url}/trabalhos/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
