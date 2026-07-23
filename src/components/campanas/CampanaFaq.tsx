import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd, faqLd } from "@/components/seo/JsonLd";
import { faqs as faqsUniversal } from "@/content/landing";
import type { FaqItem } from "@/content/campanas/types";

/** Universales de landing.ts relevantes a cualquier landing de campaña. */
const UNIVERSAL_SLUGS = ["¿Necesito venir con pareja?", "¿Qué nivel necesito?", "¿Dónde estáis?"];

/** FAQ específica del dolor (1–2 propias) + universales relevantes, con JsonLd FAQPage. */
export function CampanaFaq({ items }: { items: FaqItem[] }) {
  const universales = faqsUniversal.filter((f) => UNIVERSAL_SLUGS.includes(f.q));
  const all = [...items, ...universales];

  return (
    <section className="bg-bg-panel py-[clamp(56px,9vw,100px)]">
      <div className="container-nexus max-w-[680px]">
        <Reveal as="span" className="block font-body text-xs font-bold uppercase tracking-[0.18em] text-neon">
          Antes de escribir
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-3.5 font-display text-[clamp(30px,5vw,48px)] leading-[0.98] text-text-strong">
            Dudas rápidas
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="mt-6">
          <Accordion items={all} />
        </Reveal>
        <JsonLd data={faqLd(all)} />
      </div>
    </section>
  );
}
