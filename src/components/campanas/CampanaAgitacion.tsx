import { Reveal } from "@/components/ui/Reveal";

/**
 * Agitación del dolor (paso "agitate" de PAS): narrativa en 2ª persona que
 * hace sentir el coste de seguir igual antes de presentar la solución.
 */
export function CampanaAgitacion({ kicker, parrafos }: { kicker: string; parrafos: string[] }) {
  return (
    <section className="bg-bg-base py-[clamp(56px,9vw,100px)]">
      <div className="container-nexus max-w-[680px]">
        <Reveal as="span" className="block font-body text-xs font-bold uppercase tracking-[0.18em] text-neon">
          {kicker}
        </Reveal>
        <div className="mt-6 space-y-5">
          {parrafos.map((p, i) => (
            <Reveal key={p.slice(0, 32)} delay={i * 0.08}>
              <p className="font-body text-[clamp(17px,2vw,20px)] leading-relaxed text-text-body">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
