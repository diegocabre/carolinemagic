// src/app/sitemap.ts
import { LEGAL } from "@/config/legal";
import type { MetadataRoute } from "next";

const SITE_URL = LEGAL.sitioUrl;

const LEGALES = new Set([
  "/privacidad",
  "/cookies",
  "/terminos",
  "/derechos-datos",
  "/seguridad",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/sesiones",
    "/encuentros-grupales",
    "/academia",
    "/rituales",
    "/galeria-tienda",
    "/sobre-caroline",
    "/privacidad",
    "/cookies",
    "/terminos",
    "/derechos-datos",
    "/seguridad",
  ];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : LEGALES.has(route) ? 0.3 : 0.8,
  }));
}
