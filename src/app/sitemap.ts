import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getModalidadSlugs } from "@/lib/queries/modalidades";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;
  const now = new Date();

  const staticPaths = [
    "",
    "/profesores",
    "/horarios",
    "/eventos",
    "/sobre-nosotros",
    "/contacto",
    "/faq",
    "/aviso-legal",
    "/privacidad",
    "/cookies",
  ];

  const modalidades = await getModalidadSlugs();

  return [
    ...staticPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...modalidades.map((slug) => ({
      url: `${base}/clases/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
