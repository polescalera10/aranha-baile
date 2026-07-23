/**
 * Configuración de marca y NAP (Name · Address · Phone).
 * FUENTE ÚNICA de los datos de contacto y redes: todo el sitio (footer,
 * contacto, JSON-LD, enlaces sociales) lee de aquí. Cambiar un dato aquí
 * lo cambia en toda la web.
 *
 * Regla: los campos vacíos ("") significan "dato aún no confirmado" y la UI
 * no los muestra. Rellenar y aparecen solos.
 */
export const site = {
  name: "NEXUS VNG",
  legalName: "NEXUS VNG",
  description:
    "Escuela de salsa cubana, bachata y más en Vilanova i la Geltrú. Comunidad, niveles desde cero a avanzado y clases de prueba para empezar.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexusvng.es",
  locale: "es_ES",
  nap: {
    /** Nombre del local tal y como lo conoce la gente (se muestra en dirección). */
    venue: "Gimnasio Aranha",
    // TODO: calle y número exactos — mientras esté vacío, la UI no lo pinta.
    streetAddress: "",
    addressLocality: "Vilanova i la Geltrú",
    addressRegion: "Barcelona",
    postalCode: "08800",
    addressCountry: "ES",
    /** Teléfono visible (formato local). El de WhatsApp sale de env o del fallback de abajo. */
    telephoneDisplay: "+34 669 29 10 88",
  },
  social: {
    instagram: "https://www.instagram.com/nexusvng",
    instagramHandle: "@nexusvng",
    // TODO: URL real de TikTok — mientras esté vacío, la UI no pinta el enlace.
    tiktok: "",
  },
} as const;

/** Número de WhatsApp en formato internacional sin '+' (ej: 34669291088). */
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "34669291088";
