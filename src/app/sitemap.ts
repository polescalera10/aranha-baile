import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { listCampanaParams } from "@/content/campanas";
import { getModalidadSlugs } from "@/lib/queries/modalidades";
import { getEventoSlugs } from "@/lib/queries/eventos";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;
  const now = new Date();

  const staticPaths = [
    "",
    "/clases",
    "/socio-fundador",
    "/intensivos",
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
  // Fichas de evento: misma fuente que /eventos y /eventos/[slug]
  // (Supabase con fallback estático), así el sitemap nunca se desincroniza.
  const eventos = await getEventoSlugs();

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
    ...eventos.map((slug) => ({
      url: `${base}/eventos/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    // Landings de campaña por dolor de ICP. Nacieron para tráfico de pago y
    // estaban en noindex; se abren a orgánico por decisión de Pol (01-08-2026).
    // Prioridad por debajo de las páginas del sitio: son long tail.
    ...listCampanaParams().map(({ icp, dolor }) => ({
      url: `${base}/l/${icp}/${dolor}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
