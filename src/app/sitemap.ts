import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), priority: 1 },
    { url: `${site.url}/get-a-quote/`, lastModified: new Date(), priority: 0.9 },
    { url: `${site.url}/about/`, lastModified: new Date(), priority: 0.7 },
  ];
}
