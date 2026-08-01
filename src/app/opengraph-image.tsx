import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { modalidadesFallback } from "@/content/landing";

/**
 * og:image por defecto de TODO el sitio.
 *
 * Al vivir en `src/app/`, Next lo hereda en cada ruta que no declare su propia
 * imagen, así que los enlaces compartidos por WhatsApp (canal principal de la
 * escuela) dejan de salir desnudos.
 *
 * Ojo con `ImageResponse`: por debajo es Satori, que NO soporta todo CSS.
 * Solo flexbox, estilos inline y gradientes simples — nada de Tailwind, grid,
 * ni clases del proyecto. Los colores se replican a mano desde los tokens de
 * `globals.css` (--color-ink, --color-neon, --color-neon-mint, --color-neon-lime)
 * porque aquí no hay hoja de estilos que resolver.
 *
 * Tipografía: se usa la fuente por defecto de `next/og` en lugar de Anton.
 * Cargar Anton exigiría descargarla en build (red no garantizada) o versionar
 * el .ttf en el repo; se prioriza que el build no se rompa nunca.
 */

export const alt = `${site.name} — Escuela de baile en ${site.nap.addressLocality}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Tokens de marca (espejo de globals.css). */
const INK = "#0a0a0a";
const NEON = "#30e4ec";
const NEON_MINT = "#71e9c9";
const NEON_LIME = "#b5f6af";
const TEXT_BODY = "#c0c7c4";
const TEXT_MUTED = "#8b938f";

const BRAND_GRADIENT = `linear-gradient(100deg, ${NEON_LIME} 0%, ${NEON_MINT} 45%, ${NEON} 100%)`;

export default function OpenGraphImage() {
  const disciplinas = modalidadesFallback.map((m) => m.nombre);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK,
          // Halo neón difuso en la esquina inferior derecha: da profundidad
          // sin recurrir a blur (que Satori no soporta bien).
          backgroundImage:
            "radial-gradient(1000px 620px at 88% 108%, rgba(48,228,236,0.22) 0%, rgba(113,233,201,0.10) 38%, rgba(10,10,10,0) 72%)",
          position: "relative",
        }}
      >
        {/* Franja superior con el degradado del logo */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: 12,
            backgroundImage: BRAND_GRADIENT,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 76px",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 26,
              letterSpacing: 6,
              color: NEON,
              textTransform: "uppercase",
            }}
          >
            {site.nap.addressLocality} · {site.nap.addressRegion}
          </div>

          {/* Nombre de marca con el degradado verde→cian */}
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 148,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1,
              backgroundImage: BRAND_GRADIENT,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {site.name}
          </div>

          {/* Claim */}
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 46,
              fontWeight: 700,
              color: "#f4f7f5",
              lineHeight: 1.15,
            }}
          >
            Escuela de baile en {site.nap.addressLocality}
          </div>

          {/* Disciplinas */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 34,
              gap: 12,
            }}
          >
            {disciplinas.map((nombre) => (
              <div
                key={nombre}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 22px",
                  borderRadius: 999,
                  border: "1px solid rgba(113,233,201,0.35)",
                  backgroundColor: "rgba(48,228,236,0.07)",
                  fontSize: 26,
                  color: TEXT_BODY,
                }}
              >
                {nombre}
              </div>
            ))}
          </div>
        </div>

        {/* Pie: dominio */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 76px 52px 76px",
            fontSize: 26,
            color: TEXT_MUTED,
          }}
        >
          <div style={{ display: "flex" }}>{site.url.replace(/^https?:\/\//, "")}</div>
          <div style={{ display: "flex", color: NEON_MINT }}>{site.social.instagramHandle}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
