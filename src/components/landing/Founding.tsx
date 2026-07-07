import { Reveal } from "@/components/ui/Reveal";
import { Countdown } from "@/components/ui/Countdown";
import { WaLink } from "@/components/ui/WaLink";
import { founding } from "@/content/landing";

/**
 * Bloque de oferta fundadora.
 * Urgencia honesta: la cuenta atrás y la barra de plazas SOLO se pintan si hay
 * datos reales en content/landing.ts (deadline / spotsLeft / spotsTotal).
 */
export function Founding() {
  const { price, priceOld, spotsLeft, spotsTotal, deadline } = founding;

  const hasSpots = spotsLeft !== null && spotsTotal !== null && spotsTotal > 0;
  const takenPct = hasSpots
    ? Math.max(6, Math.round(((spotsTotal - spotsLeft) / spotsTotal) * 100))
    : 0;

  return (
    <section className="relative overflow-hidden bg-ink py-[clamp(70px,10vw,130px)] text-white">
      {/* Halo dorado superior. */}
      <div className="pointer-events-none absolute -top-[140px] left-1/2 h-[380px] w-[680px] max-w-[120vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,.22),transparent_70%)]" />

      <div className="container-aranha relative z-[1] max-w-[680px]">
        <Reveal className="text-center">
          <span className="block font-body text-xs font-extrabold uppercase tracking-[0.2em] text-gold">
            {founding.kicker}
          </span>
          <h2 className="mt-3.5 text-balance font-display text-[clamp(36px,6vw,64px)] leading-[0.96] text-white">
            {founding.title}
          </h2>
          <p className="mx-auto mt-3.5 max-w-[46ch] font-body text-[clamp(16px,1.4vw,18px)] leading-relaxed text-white/72">
            {founding.subtitle}
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-[30px] rounded-xl border-[1.5px] border-gold/55 bg-[linear-gradient(180deg,#151310,#0d0b09)] p-[clamp(24px,4vw,40px)] shadow-gold"
        >
          <div className="flex justify-center">
            <span className="rounded-full border border-gold/40 bg-gold/12 px-3.5 py-[7px] font-body text-[11px] font-extrabold uppercase tracking-[0.12em] text-gold">
              {founding.badge}
            </span>
          </div>

          <div className="mt-[18px] flex items-baseline justify-center gap-2.5">
            <span className="font-display text-[clamp(54px,9vw,76px)] leading-none text-gold">
              {price}
            </span>
            <span className="font-body text-[17px] text-[#c9bda3]">/mes</span>
            <span className="font-body text-[19px] text-[#7d7460] line-through">{priceOld}</span>
          </div>

          {/* Cuenta atrás: solo con fecha límite real. */}
          {deadline && (
            <>
              <div className="mt-6 text-center font-body text-xs font-semibold uppercase tracking-[0.05em] text-[#b9a98a]">
                {founding.deadlineLabel}
              </div>
              <Countdown deadline={deadline} />
            </>
          )}

          {/* Barra de plazas: solo con aforo real. */}
          {hasSpots && (
            <div className="mt-6">
              <div className="mb-2 flex justify-between font-body text-xs text-[#c9bda3]">
                <span>Plazas fundadoras</span>
                <span>
                  Quedan {spotsLeft} / {spotsTotal}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#D4AF37,#E8A87C)]"
                  style={{ width: `${takenPct}%` }}
                />
              </div>
            </div>
          )}

          {/* Urgencia basada en hechos (aforo físico, periodo de apertura). */}
          <p className="mt-6 text-center font-body text-sm leading-relaxed text-[#c9bda3]">
            {founding.urgencyNote}
          </p>

          <WaLink origin="founding" variant="gold" className="mt-6 w-full py-[18px] text-base">
            {founding.cta}
          </WaLink>
          <p className="mt-3 text-center font-body text-xs text-[#8a8070]">{founding.finePrint}</p>
        </Reveal>
      </div>
    </section>
  );
}
