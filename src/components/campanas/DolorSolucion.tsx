import { Reveal } from "@/components/ui/Reveal";
import type { DolorSolucionBlock } from "@/content/campanas/types";

/** 3 bloques dolor → solución: espejo directo del dolor concreto del ICP. */
export function DolorSolucion({ items }: { items: DolorSolucionBlock[] }) {
  return (
    <section className="bg-bg-base py-[clamp(56px,9vw,100px)]">
      <div className="container-nexus">
        <div className="grid gap-5 sm:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={item.dolor}
              delay={i * 0.08}
              className="rounded-lg border border-white/8 bg-bg-panel p-6 shadow-soft"
            >
              <p className="font-body text-[14px] leading-relaxed text-text-muted line-through decoration-white/30">
                {item.dolor}
              </p>
              <p className="mt-3 font-body text-[16px] font-semibold leading-relaxed text-text-strong">
                {item.solucion}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
