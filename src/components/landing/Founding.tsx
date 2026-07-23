import { Reveal } from "@/components/ui/Reveal";
import { Countdown } from "@/components/ui/Countdown";
import { WaLink } from "@/components/ui/WaLink";
import { founding } from "@/content/landing";

/**
 * Bloque de oferta fundadora — dos columnas: tarjeta de la oferta + qué incluye.
 * Es EL bloque premium del sitio: titular con el degradado NEXUS, bordes y
 * detalles en neon-lime y glow menta sobre panel oscuro.
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
    <section className="relative overflow-hidden bg-bg-base py-[clamp(70px,10vw,130px)] text-white">
      {/* Halo neón superior (degradado de marca, muy difuminado). */}
      <div className="pointer-events-none absolute -top-[140px] left-1/2 h-[380px] w-[680px] max-w-[120vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(113,233,201,.16),transparent_70%)]" />

      <div className="container-nexus relative z-[1] max-w-[960px]">
        <Reveal className="mb-10 text-center">
          <span className="block font-body text-xs font-extrabold uppercase tracking-[0.2em] text-neon-lime">
            {founding.kicker}
          </span>
          <h2 className="mt-3.5 text-balance font-display text-[clamp(36px,6vw,64px)] leading-[0.96]">
            <span className="text-gradient-nexus">{founding.title}</span>
          </h2>
          <p className="mx-auto mt-3.5 max-w-[50ch] font-body text-[clamp(16px,1.4vw,18px)] leading-relaxed text-white/72">
            {founding.subtitle}
          </p>
        </Reveal>

        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Columna izquierda: tarjeta de la oferta */}
          <Reveal
            delay={0.1}
            className="rounded-xl border-[1.5px] border-neon-lime/45 bg-[linear-gradient(180deg,#16161b,#0d0d10)] p-[clamp(24px,4vw,40px)] shadow-glow"
          >
            <div className="flex justify-center">
              <span className="rounded-full border border-neon-lime/40 bg-neon-lime/10 px-3.5 py-[7px] font-body text-[11px] font-extrabold uppercase tracking-[0.12em] text-neon-lime">
                {founding.badge}
              </span>
            </div>

            <div className="mt-[18px] flex items-baseline justify-center gap-2.5">
              <span className="font-display text-[clamp(54px,9vw,76px)] leading-none text-neon-mint">
                {price}
              </span>
              <span className="font-body text-[17px] text-white/65">/mes</span>
              {/* Cuota estándar tachada: solo cuando exista la cifra real. */}
              {priceOld && (
                <span className="font-body text-[19px] text-white/40 line-through">{priceOld}</span>
              )}
            </div>

            {/* Cuenta atrás: solo con fecha límite real. */}
            {deadline && (
              <>
                <div className="mt-6 text-center font-body text-xs font-semibold uppercase tracking-[0.05em] text-white/60">
                  {founding.deadlineLabel}
                </div>
                <Countdown deadline={deadline} />
              </>
            )}

            {/* Barra de plazas: solo con aforo real. */}
            {hasSpots && (
              <div className="mt-6">
                <div className="mb-2 flex justify-between font-body text-xs text-white/65">
                  <span>Plazas fundadoras</span>
                  <span>
                    Quedan {spotsLeft} / {spotsTotal}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-neon-lime via-neon-mint to-neon"
                    style={{ width: `${takenPct}%` }}
                  />
                </div>
              </div>
            )}

            {/* Urgencia basada en hechos (aforo físico, periodo de apertura). */}
            <p className="mt-6 text-center font-body text-sm leading-relaxed text-white/70">
              {founding.urgencyNote}
            </p>

            <WaLink origin="founding" variant="gold" className="mt-6 w-full py-[18px] text-base">
              {founding.cta}
            </WaLink>
            <p className="mt-3 text-center font-body text-xs text-white/50">{founding.finePrint}</p>
          </Reveal>

          {/* Columna derecha: qué incluye la plaza fundadora */}
          <Reveal delay={0.2} className="space-y-6 text-left lg:pl-6">
            <h3 className="font-display text-2xl uppercase tracking-wide text-neon-lime">
              {founding.benefitsTitle}
            </h3>

            <p className="font-body text-[15px] leading-relaxed text-white/80">
              {founding.benefitsIntro}
            </p>

            <ul className="list-none space-y-4 p-0">
              {founding.benefits.map((benefit) => (
                <li key={benefit.title} className="flex items-start gap-3">
                  <span className="mt-1 text-lg leading-none text-neon-lime">✓</span>
                  <span className="font-body text-[14px] leading-relaxed text-white/85">
                    <strong className="text-white">{benefit.title}:</strong> {benefit.text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="rounded-lg border border-neon-lime/20 bg-neon-lime/5 p-4 font-body text-[13px] leading-relaxed text-white/70">
              {founding.conditionNote}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
