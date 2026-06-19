import { Reveal } from "@/components/ui/Reveal";
import { steps } from "@/content/landing";

export function ComoEmpezar() {
  return (
    <section className="bg-bg-base py-[clamp(64px,9vw,120px)]">
      <div className="container-aranha">
        <Reveal as="span" className="block font-body text-xs font-bold uppercase tracking-[0.18em] text-red">
          Cómo empezar
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-3.5 font-display text-[clamp(34px,5.5vw,66px)] leading-[0.98] text-text-strong">
            Tres pasos y estás dentro
          </h2>
        </Reveal>

        <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[clamp(22px,3vw,40px)]">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="border-t-2 border-text-strong/12 pt-[18px]">
              <span className="block font-display text-[clamp(40px,5vw,56px)] leading-[0.85] text-warm">
                {s.n}
              </span>
              <h3 className="mb-2 mt-3.5 font-display text-[clamp(22px,2.4vw,28px)] text-text-strong">
                {s.title}
              </h3>
              <p className="max-w-[34ch] font-body text-base leading-relaxed text-text-muted">
                {s.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
