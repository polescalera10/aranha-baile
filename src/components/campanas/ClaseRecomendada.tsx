import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { WaLink } from "@/components/ui/WaLink";
import type { CampanaDolorContent } from "@/content/campanas/types";

/**
 * La clase concreta que resuelve el dolor de esta landing: nombre, por qué
 * exactamente ESTA disciplina, CTA de WhatsApp y enlace a la página real de
 * la modalidad. Es el puente dolor → producto de cada landing.
 */
export function ClaseRecomendada({
  clase,
  mensajeWhatsapp,
}: {
  clase: CampanaDolorContent["clase"];
  mensajeWhatsapp: string;
}) {
  return (
    <section className="relative overflow-hidden bg-bg-base py-[clamp(56px,9vw,100px)] text-white">
      {/* Foco de luz sobre la recomendación: es el momento producto de la página. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_0%,rgba(113,233,201,.10),transparent_70%)]" />

      <div className="container-nexus relative z-[1] max-w-[820px]">
        <Reveal as="span" className="block font-body text-xs font-bold uppercase tracking-[0.18em] text-neon-lime">
          Tu clase
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-3.5 max-w-[20ch] text-balance font-display text-[clamp(32px,6vw,56px)] leading-[0.96]">
            <span className="text-gradient-nexus">{clase.titulo}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 max-w-[58ch] font-body text-[clamp(16px,1.6vw,19px)] leading-relaxed text-white/85">
            {clase.descripcion}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {clase.porQue.map((razon, i) => (
            <Reveal key={razon.title} delay={0.16 + i * 0.08} className="border-t-2 border-neon-lime/30 pt-4">
              <h3 className="font-body text-[15px] font-bold text-white">{razon.title}</h3>
              <p className="mt-1.5 font-body text-[14px] leading-relaxed text-white/70">{razon.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
          <WaLink origin="campana" extra={mensajeWhatsapp} variant="red" className="px-7 py-[16px] text-base">
            {clase.cta}
          </WaLink>
          <Link
            href={`/clases/${clase.slug}`}
            className="font-body text-sm font-semibold text-neon-mint underline-offset-4 hover:underline"
          >
            Saber más sobre {clase.nombre} →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
