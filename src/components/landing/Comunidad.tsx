import { Reveal } from "@/components/ui/Reveal";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { reviews, googleRating } from "@/content/landing";

export function Comunidad() {
  return (
    <section className="bg-bg-base py-[clamp(64px,9vw,120px)]">
      <div className="container-aranha">
        <Reveal as="span" className="block font-body text-xs font-bold uppercase tracking-[0.18em] text-red">
          El corazón
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-3.5 max-w-[16ch] text-balance font-display text-[clamp(34px,5.5vw,66px)] leading-[0.98] text-text-strong">
            El corazón son las personas
          </h2>
        </Reveal>

        {/* Badge de valoración: solo se pinta con la nota REAL de Google (ver content/landing.ts). */}
        {googleRating && (
          <Reveal delay={0.1} className="mt-[18px] inline-flex items-center gap-3 rounded-full border border-text-strong/8 bg-white px-[18px] py-2.5 shadow-soft">
            <span className="font-display text-[26px] leading-none text-text-strong">{googleRating}</span>
            <span className="text-base tracking-[1px] text-star">★★★★★</span>
            <span className="font-body text-[13px] font-semibold text-text-muted">
              Reseñas reales en Google
            </span>
          </Reveal>
        )}

        {/* Mosaico de fotos. PLACEHOLDER: fotografía real de fiestas/eventos/caras. */}
        <Reveal delay={0.12} className="mt-[30px] grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3">
          <PhotoPlaceholder label="[ fiesta ]" tint="warm" className="row-span-2 min-h-[300px] rounded-lg p-3" />
          <PhotoPlaceholder label="[ masterclass ]" tint="red" className="min-h-[144px] rounded-lg p-3" />
          <PhotoPlaceholder label="[ caras ]" tint="warm" className="min-h-[144px] rounded-lg p-3" />
          <PhotoPlaceholder label="[ noche social · directo ]" tint="mix" className="col-span-full min-h-[130px] rounded-lg p-3" />
        </Reveal>

        {/* Reseñas: SOLO reales de Google. Mientras no haya, placeholder visible (Directiva Omnibus). */}
        {reviews.length === 0 && (
          <div className="mt-4 rounded-lg border border-dashed border-text-strong/20 bg-white/60 p-8 font-body text-sm text-text-muted">
            [ TODO: reseñas reales de Google — texto literal y con permiso. No publicar esta sección
            sin reseñas verificadas. ]
          </div>
        )}

        <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {reviews.map((r, i) => (
            <Reveal
              key={r.name}
              delay={i * 0.08}
              className="flex flex-col rounded-lg border border-text-strong/5 bg-white p-6 shadow-card"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-[11px]">
                  <span className={`flex h-[42px] w-[42px] flex-none items-center justify-center rounded-full font-body text-[17px] font-bold text-white ${r.hue}`}>
                    {r.initial}
                  </span>
                  <div className="min-w-0">
                    <div className="font-body text-sm font-bold text-text-strong">{r.name}</div>
                    <div className="font-body text-xs text-text-faint">{r.date}</div>
                  </div>
                </div>
                <span className="flex-none rounded-full border border-text-strong/12 px-[9px] py-1 font-body text-[11px] font-bold text-text-muted">
                  Google
                </span>
              </div>
              <div className="mt-3.5 text-[15px] tracking-[1px] text-star">★★★★★</div>
              <p className="mt-2.5 font-body text-[15px] leading-relaxed text-[#33291f]">{r.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
