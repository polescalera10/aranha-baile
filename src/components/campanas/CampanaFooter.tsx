import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { site } from "@/lib/site";

/** Enlaces al sitio: rompen el aislamiento de las landings sin romper el foco. */
const SITIO: ReadonlyArray<readonly [string, string]> = [
  ["/clases", "Clases"],
  ["/horarios", "Horarios"],
  ["/sobre-nosotros", "Sobre nosotros"],
  ["/contacto", "Contacto"],
];

/** Obligatorios: la landing recoge datos personales en el formulario de lead. */
const LEGAL: ReadonlyArray<readonly [string, string]> = [
  ["/aviso-legal", "Aviso legal"],
  ["/privacidad", "Privacidad"],
  ["/cookies", "Cookies"],
];

/**
 * Pie MÍNIMO de las landings de campaña (/l/[icp]/[dolor]).
 *
 * No replica el Footer del sitio a propósito: la landing tiene un único
 * objetivo (WhatsApp) y el pie no debe competir con él. Solo cubre lo que la
 * página necesita de verdad ahora que también recibe tráfico orgánico:
 *   · acceso a aviso legal / privacidad / cookies desde la propia página
 *     donde se recogen datos personales;
 *   · 4 enlaces internos al sitio, para que las 30 landings dejen de ser
 *     huérfanas y repartan autoridad.
 *
 * El padding inferior deja hueco al WhatsApp sticky (`CampanaSticky`, fijo
 * abajo con z-[60]): ~88px de botón + margen + safe-area del iPhone.
 */
export function CampanaFooter() {
  return (
    <footer className="bg-ink border-t border-white/8 pt-[clamp(32px,5vw,48px)] pb-[calc(112px_+_env(safe-area-inset-bottom))] text-white">
      <div className="container-nexus">
        <Logo size={22} />

        {/* Objetivos táctiles de 44px en móvil; en sm+ vuelve la fila compacta. */}
        <nav aria-label="Secciones del sitio" className="mt-2 sm:mt-4">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {SITIO.map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-body hover:text-neon inline-flex min-h-11 items-center text-[13px] text-white/70 no-underline transition-colors sm:min-h-0"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-2 h-px bg-white/10 sm:mt-5" />

        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 sm:mt-3 sm:gap-x-5">
          {LEGAL.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="font-body hover:text-neon inline-flex min-h-11 items-center text-xs text-white/50 no-underline transition-colors sm:min-h-0"
            >
              {label}
            </Link>
          ))}
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} {site.name} · {site.locality}
          </p>
        </div>
      </div>
    </footer>
  );
}
