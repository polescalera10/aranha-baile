import { Reveal } from "@/components/ui/Reveal";
import { steps } from "@/content/landing";

/** Reutiliza el patrón `steps` de la landing principal (Escríbenos → Te ubicamos → Vienes a probar). */
export function ComoFunciona() {
  return (
    <section className="bg-bg-panel py-[clamp(56px,9vw,100px)]">
      <div className="container-nexus">
        <Reveal as="span" className="block font-body text-xs font-bold uppercase tracking-[0.18em] text-neon">
          Cómo funciona
        </Reveal>
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="border-t-2 border-neon/25 pt-4">
              <span className="block font-display text-[clamp(32px,4vw,44px)] leading-[0.85] text-neon-mint">
                {s.n}
              </span>
              <h3 className="mb-1.5 mt-3 font-display text-xl text-text-strong">{s.title}</h3>
              <p className="max-w-[32ch] font-body text-[15px] leading-relaxed text-text-muted">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
