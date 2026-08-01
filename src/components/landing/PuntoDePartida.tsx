import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "¿Con cuál te identificas?" — puente entre la home y las landings por dolor.
 *
 * Cumple dos funciones. Para el visitante: le lleva directo a la página que
 * habla de SU situación en vez de obligarle a leer la landing genérica. Para
 * Google: las 30 landings de campaña solo recibían enlaces desde el sitemap;
 * sin enlaces internos reales eran páginas huérfanas y no recibían autoridad.
 *
 * Se enlazan seis, una por cada perfil (ICP), no las treinta: la home no es un
 * índice, y treinta enlaces al mismo destino comercial huelen a spam.
 */
const CASOS = [
  {
    label: "Nunca he bailado y creo que no tengo ritmo",
    href: "/l/empezar/dos-pies-izquierdos",
  },
  {
    label: "Quiero apuntarme, pero iría solo/a",
    href: "/l/social/vengo-solo",
  },
  {
    label: "Buscamos un plan en pareja que no sea otra cena",
    href: "/l/pareja/es-para-nosotros",
  },
  {
    label: "Ya bailo, pero siento que me he estancado",
    href: "/l/nivel/techo",
  },
  {
    label: "Odio el gimnasio y necesito moverme de otra forma",
    href: "/l/expresion/odio-el-gym",
  },
  {
    label: "Creo que se me ha pasado la edad",
    href: "/l/empezar/ya-soy-mayor",
  },
] as const;

export function PuntoDePartida() {
  return (
    <section className="bg-ink py-[clamp(56px,9vw,110px)]">
      <div className="container-nexus">
        <Reveal>
          <span className="font-body text-neon-mint/80 text-[11px] font-bold tracking-[0.16em] uppercase">
            Por dónde empezar
          </span>
          <h2 className="font-display text-text-strong mt-3.5 max-w-[20ch] text-balance text-[clamp(34px,5.5vw,66px)] leading-[0.98]">
            ¿Con cuál te identificas?
          </h2>
          <p className="font-body text-text-muted mt-4 max-w-[58ch] text-base leading-relaxed">
            Casi todo el mundo llega con la misma duda de fondo. Elige la tuya y te contamos cómo lo
            resolvemos.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {CASOS.map((caso) => (
            <li key={caso.href}>
              <Link
                href={caso.href}
                className="group border-white/8 bg-bg-panel hover:border-neon/40 flex min-h-14 items-center justify-between gap-4 rounded-lg border px-5 py-4 no-underline transition-colors"
              >
                <span className="font-body text-text-body group-hover:text-text-strong text-[15px] leading-snug transition-colors">
                  {caso.label}
                </span>
                <span
                  aria-hidden="true"
                  className="text-neon shrink-0 text-lg transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
