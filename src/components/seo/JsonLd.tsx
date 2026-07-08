import { site } from "@/lib/site";

/** Inserta un bloque JSON-LD. `data` debe ser serializable. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es nuestro, no entrada de usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Schema.org LocalBusiness — global (footer / home). */
export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "DanceSchool",
    name: site.name,
    description: site.description,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      // La calle se omite del schema hasta que esté confirmada en lib/site.ts.
      streetAddress: site.nap.streetAddress || undefined,
      addressLocality: site.nap.addressLocality,
      addressRegion: site.nap.addressRegion,
      postalCode: site.nap.postalCode,
      addressCountry: site.nap.addressCountry,
    },
    telephone: site.nap.telephoneDisplay,
    sameAs: [site.social.instagram, site.social.tiktok].filter(Boolean),
  };
}

/** Schema.org Course — páginas de modalidad. */
export function courseLd(nombre: string, descripcion: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: nombre,
    description: descripcion,
    url: `${site.url}/clases/${slug}`,
    provider: {
      "@type": "DanceSchool",
      name: site.name,
      sameAs: site.url,
    },
  };
}

/** Schema.org Event — /eventos. */
export function eventLd(e: {
  titulo: string;
  descripcion?: string | null;
  fecha: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.titulo,
    description: e.descripcion ?? undefined,
    startDate: e.fecha,
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: site.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.nap.addressLocality,
        addressCountry: site.nap.addressCountry,
      },
    },
    organizer: { "@type": "Organization", name: site.name, url: site.url },
  };
}

/** Schema.org FAQPage — /faq y bloque FAQ de la landing. */
export function faqLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
