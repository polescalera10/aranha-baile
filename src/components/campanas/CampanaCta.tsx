import { Reveal } from "@/components/ui/Reveal";
import { WaLink } from "@/components/ui/WaLink";
import { CampanaLeadForm } from "@/components/campanas/CampanaLeadForm";

/** CTA final: WhatsApp (principal) + formulario de captación (alternativa). */
export function CampanaCta({
  cierreEmocional,
  ctaLabel,
  mensajeWhatsapp,
  icp,
  dolor,
}: {
  cierreEmocional: string;
  ctaLabel: string;
  mensajeWhatsapp: string;
  icp: string;
  dolor: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-bg-panel py-[clamp(56px,9vw,100px)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_100%,rgba(48,228,236,.14),transparent_70%)]" />

      <div className="relative z-[1] container-nexus max-w-[560px] text-center">
        <Reveal>
          <h2 className="font-display text-[clamp(34px,7vw,56px)] leading-[0.94]">
            <span className="text-gradient-nexus">¿Empezamos?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 font-body text-[15px] leading-relaxed text-white/85">{cierreEmocional}</p>
        </Reveal>
        <Reveal delay={0.12} className="mt-7 flex justify-center">
          <WaLink origin="campana" extra={mensajeWhatsapp} variant="red" className="px-7 py-[16px] text-base">
            {ctaLabel}
          </WaLink>
        </Reveal>

        <Reveal delay={0.18} className="mt-10 rounded-lg border border-white/10 bg-bg-panel/60 p-6 text-left">
          <p className="mb-4 text-center font-body text-sm text-white/65">
            ¿Prefieres que te contactemos nosotros?
          </p>
          <CampanaLeadForm icp={icp} dolor={dolor} />
        </Reveal>
      </div>
    </section>
  );
}
