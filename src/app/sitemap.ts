// src/app/sitemap.ts
import type { MetadataRoute } from "next";

const SITE_URL = "https://www.carolinemagic.cl";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/lecturas",
    "/encuentros-grupales",
    "/academia",
    "/rituales",
    "/galeria-tienda",
    "/sobre-caroline",
  ];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
