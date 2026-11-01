import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return { rules: siteUrl ? { userAgent: "*", allow: siteUrl.pathname } : { userAgent: "*", disallow: "/" }, ...(siteUrl ? { sitemap: new URL("sitemap.xml", siteUrl).href } : {}) };
}
