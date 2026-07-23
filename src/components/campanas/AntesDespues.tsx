import { Reveal } from "@/components/ui/Reveal";
import type { CampanaDolorContent } from "@/content/campanas/types";

/**
 * Contraste antes → después (efecto contraste + future pacing).
 * Columna "antes" apagada; columna "después" con el neón de marca.
 */
export function AntesDespues({ data }: { data: CampanaDolorContent["antesDespues"] }) {
  return (
    <section className="bg-bg-panel py-[clamp(56px,9vw,100px)]">
      <div className="container-nexus max-w-[880px]">
        <Reveal>
          <h2 className="max-w-[22ch] text-balance font-display text-[clamp(30px,5.5vw,52px)] leading-[0.98] text-text-strong">
            {data.titulo}
          </h2>
        </Reveal>

        <div className="mt-9 grid gap-5 sm:grid-cols-2">
          {/* Antes: apagado, tachado visualmente por el borde neutro */}
          <Reveal delay={0.08} className="rounded-lg border border-white/10 bg-bg-base p-6">
            <span className="font-body text-[11px] font-extrabold uppercase tracking-[0.14em] text-text-muted">
              {data.antesLabel}
            </span>
            <ul className="mt-4 space-y-3">
              {data.antes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[9px] h-[6px] w-[6px] flex-none rounded-full bg-text-muted/50" aria-hidden />
                  <span className="font-body text-[15px] leading-relaxed text-text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Después: el neón de marca marca la dirección */}
          <Reveal
            delay={0.16}
            className="rounded-lg border-[1.5px] border-neon/40 bg-bg-base p-6 shadow-neon"
          >
            <span className="font-body text-[11px] font-extrabold uppercase tracking-[0.14em] text-neon">
              {data.despuesLabel}
            </span>
            <ul className="mt-4 space-y-3">
              {data.despues.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[7px] h-2 w-2 flex-none rounded-full bg-neon" aria-hidden />
                  <span className="font-body text-[15px] font-medium leading-relaxed text-text-strong">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
