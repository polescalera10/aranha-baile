import { sesionesRegulares } from "@/content/horario-regular";
import { precios } from "@/content/precios";
import { site } from "@/lib/site";

/** Día de la semana del cartel → schema.org DayOfWeek. */
const DIA_SCHEMA: Record<string, string> = {
  Lunes: "https://schema.org/Monday",
  Martes: "https://schema.org/Tuesday",
  Miércoles: "https://schema.org/Wednesday",
  Jueves: "https://schema.org/Thursday",
  Viernes: "https://schema.org/Friday",
};

/**
 * Horario de apertura derivado del cartel real: primera y última clase de cada
 * día. No se inventa nada — si un día no tiene clases, no aparece.
 */
function openingHours() {
  return Object.entries(DIA_SCHEMA)
    .map(([dia, dayOfWeek]) => {
      const horas = sesionesRegulares.filter((s) => s.dia === dia).map((s) => s.hora);
      if (horas.length === 0) return null;
      const orden = [...horas].sort();
      const apertura = orden[0]!;
      // Las clases duran una hora larga; se cierra a la hora en punto siguiente.
      const [h = 0, m = 0] = orden[orden.length - 1]!.split(":").map(Number);
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek,
        opens: apertura,
        closes: `${String(h + 1 + (m >= 30 ? 1 : 0)).padStart(2, "0")}:00`,
      };
    })
    .filter(Boolean);
}

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
    // Rango de precio derivado del modelo real (35–100 €/mes), no inventado.
    priceRange: `${precios.base}–${precios.flat} €/${precios.periodo}`,
    currenciesAccepted: "EUR",
    areaServed: [
      { "@type": "City", name: "Vilanova i la Geltrú" },
      { "@type": "AdministrativeArea", name: "Garraf" },
    ],
    openingHoursSpecification: openingHours(),
    knowsLanguage: ["es-ES", "ca-ES"],
  };
}

/**
 * Schema.org BreadcrumbList. `items` en orden jerárquico, del inicio a la
 * página actual; la última entrada es la propia página.
 */
export function breadcrumbLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/**
 * Schema.org Course — páginas de modalidad.
 *
 * `sesiones` alimenta `hasCourseInstance` con las clases reales del cartel:
 * sin al menos una instancia y una oferta, Google no considera la página
 * elegible para el resultado enriquecido de curso.
 */
export function courseLd(
  nombre: string,
  descripcion: string,
  slug: string,
  sesiones: Array<{ dia: string; hora: string; nivel?: string }> = [],
) {
  const provider = { "@type": "DanceSchool", name: site.name, sameAs: site.url };

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: nombre,
    description: descripcion,
    url: `${site.url}/clases/${slug}`,
    inLanguage: "es-ES",
    provider,
    offers: {
      "@type": "Offer",
      category: "Subscription",
      price: precios.base,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${site.url}/clases/${slug}`,
    },
    hasCourseInstance: sesiones.map((s) => ({
      "@type": "CourseInstance",
      courseMode: "Onsite",
      courseWorkload: "PT1H",
      name: [nombre, s.nivel].filter(Boolean).join(" · "),
      courseSchedule: {
        "@type": "Schedule",
        repeatFrequency: "P1W",
        byDay: DIA_SCHEMA[s.dia],
        startTime: s.hora,
        scheduleTimezone: "Europe/Madrid",
      },
      location: {
        "@type": "Place",
        name: `${site.name} · ${site.nap.venue}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.nap.streetAddress || undefined,
          addressLocality: site.nap.addressLocality,
          postalCode: site.nap.postalCode,
          addressCountry: site.nap.addressCountry,
        },
      },
    })),
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
