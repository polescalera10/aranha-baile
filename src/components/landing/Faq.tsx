import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { faqs } from "@/content/landing";

export function Faq() {
  return (
    <section className="bg-bg-panel py-[clamp(64px,9vw,120px)]">
      <div className="mx-auto w-full max-w-[780px] px-[clamp(20px,5vw,56px)]">
        <Reveal as="span" className="block font-body text-xs font-bold uppercase tracking-[0.18em] text-neon">
          Antes de escribir
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-3.5 font-display text-[clamp(34px,5.5vw,66px)] leading-[0.98] text-text-strong">
            Dudas rápidas
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="mt-[26px]">
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
