import { Header } from "@/components/layout/Header";
import { Reveal } from "@/components/ui/Reveal";
import { WaLink } from "@/components/ui/WaLink";
import { hero } from "@/content/landing";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* Fondo texturizado con zoom lento (decorativo). PLACEHOLDER: vídeo real. */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#3a2820_0_18px,#2f201a_18px_36px)] motion-safe:animate-[slowzoom_22s_ease-in-out_infinite_alternate]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,.5)_0%,rgba(10,10,10,.2)_35%,rgba(10,10,10,.55)_70%,rgba(10,10,10,.95)_100%)]" />
      {/* Marcador del vídeo pendiente (oculto en producción; reactivar como referencia si hace falta):
      <div className="absolute right-3.5 top-3.5 z-[5] rounded-md border border-white/25 px-2 py-1 font-mono text-[10px] tracking-[0.04em] text-white/55">
        [ vídeo · gente bailando ]
      </div>
      */}

      <Header />

      <div className="container-aranha relative z-[2] flex min-h-screen flex-col justify-end pb-[clamp(56px,9vh,110px)] pt-[140px]">
        <Reveal className="mb-[22px] inline-flex items-center gap-[9px]">
          <span className="h-2 w-2 rounded-full bg-red motion-safe:animate-[dotpulse_1.8s_ease-in-out_infinite]" />
          <span className="font-body text-xs font-bold uppercase tracking-[0.18em] text-warm">
            {hero.kicker}
          </span>
        </Reveal>

        <Reveal as="div" delay={0.08}>
          <h1 className="max-w-[16ch] text-balance font-display text-[clamp(48px,8.5vw,108px)] leading-[0.92] tracking-[0.005em] text-white">
            {hero.title}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-[22px] max-w-[48ch] font-body text-[clamp(16px,1.5vw,20px)] leading-relaxed text-white/85">
            {hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.24} className="mt-[30px] flex flex-wrap items-center gap-x-[22px] gap-y-4">
          <WaLink origin="hero" variant="red" className="px-7 py-[18px] text-base">
            {hero.cta}
          </WaLink>
          <span className="font-body text-sm text-white/70">{hero.ctaNote}</span>
        </Reveal>
      </div>
    </section>
  );
}
