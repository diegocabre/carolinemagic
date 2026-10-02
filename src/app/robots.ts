// src/app/robots.ts
import { LEGAL } from "@/config/legal";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/api/"],
    },
    sitemap: `${LEGAL.sitioUrl}/sitemap.xml`,
  };
}
