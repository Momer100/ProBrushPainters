import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { slugify } from "@/lib/utils";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const corePages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified, priority: 1 },
    { url: `${site.url}/get-a-quote/`, lastModified, priority: 0.9 },
    { url: `${site.url}/services/`, lastModified, priority: 0.8 },
    { url: `${site.url}/about/`, lastModified, priority: 0.7 },
    { url: `${site.url}/contact/`, lastModified, priority: 0.6 },
    { url: `${site.url}/painters/`, lastModified, priority: 0.7 },
  ];

  // One entry per town location page.
  const locationPages: MetadataRoute.Sitemap = site.locations.map((loc) => ({
    url: `${site.url}/painters/${slugify(loc.name)}/`,
    lastModified,
    priority: 0.6,
  }));

  return [...corePages, ...locationPages];
}
