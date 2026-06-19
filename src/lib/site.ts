/**
 * Configuración de marca y NAP (Name · Address · Phone).
 * NAP consistente en footer + JSON-LD de todo el sitio.
 * PLACEHOLDER: completa dirección/teléfono reales antes de publicar.
 */
export const site = {
  name: "Aranha Baile",
  legalName: "Aranha Baile",
  description:
    "Escuela de salsa cubana, bachata y más en Vilanova i la Geltrú. Comunidad, niveles desde cero a avanzado y primera clase de prueba gratis.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aranhabaile.com",
  locale: "es_ES",
  nap: {
    streetAddress: "C/ ____", // PLACEHOLDER: calle y número
    addressLocality: "Vilanova i la Geltrú",
    addressRegion: "Barcelona",
    postalCode: "08800", // PLACEHOLDER
    addressCountry: "ES",
    /** Teléfono visible (formato local). El de WhatsApp sale de env. */
    telephoneDisplay: "+34 ___ ___ ___", // PLACEHOLDER
  },
  social: {
    instagram: "#", // PLACEHOLDER
    tiktok: "#", // PLACEHOLDER
  },
} as const;

/** Número de WhatsApp en formato internacional sin '+' (ej: 34600000000). */
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "34600000000";
