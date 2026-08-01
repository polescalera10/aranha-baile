import { site } from "@/lib/site";

/**
 * Imagen de Open Graph compartida por todas las páginas.
 *
 * Next NO fusiona el campo `openGraph`: en cuanto una página declara el suyo
 * en `generateMetadata`, sustituye entero al del layout raíz y se pierde la
 * imagen que genera `app/opengraph-image.tsx`. Por eso toda página con
 * `openGraph` propio tiene que incluir `images: ogImages` explícitamente —
 * si no, el enlace se comparte por WhatsApp sin miniatura.
 */
export const ogImages = [
  {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${site.name} — Escuela de baile en ${site.locality}`,
  },
];
