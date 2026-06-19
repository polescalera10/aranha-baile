import { Reveal } from "@/components/ui/Reveal";
import { Countdown } from "@/components/ui/Countdown";
import { WaLink } from "@/components/ui/WaLink";
import { founding } from "@/content/landing";

export function Founding() {
  const { price, priceOld, deadline } = founding;

  return (
    <section className="relative overflow-hidden bg-ink py-[clamp(70px,10vw,130px)] text-white">
      {/* Halo dorado superior. */}
      <div className="pointer-events-none absolute -top-[140px] left-1/2 h-[380px] w-[680px] max-w-[120vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,.22),transparent_70%)]" />

      <div className="container-aranha relative z-[1] max-w-[960px]">
        <Reveal className="text-center mb-10">
          <span className="block font-body text-xs font-extrabold uppercase tracking-[0.2em] text-gold">
            Plazas fundadoras
          </span>
          <h2 className="mt-3.5 text-balance font-display text-[clamp(36px,6vw,64px)] leading-[0.96] text-white">
            Sé fundador desde el día uno
          </h2>
          <p className="mx-auto mt-3.5 max-w-[50ch] font-body text-[clamp(16px,1.4vw,18px)] leading-relaxed text-white/72">
            Perteneces antes que nadie y tu tarifa queda bloqueada de por vida. Plazas limitadas.
          </p>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Columna Izquierda: Tarjeta de la oferta */}
          <Reveal
            delay={0.1}
            className="rounded-xl border-[1.5px] border-gold/55 bg-[linear-gradient(180deg,#151310,#0d0b09)] p-[clamp(24px,4vw,40px)] shadow-gold"
          >
            <div className="flex justify-center">
              <span className="rounded-full border border-gold/40 bg-gold/12 px-3.5 py-[7px] font-body text-[11px] font-extrabold uppercase tracking-[0.12em] text-gold">
                Precio bloqueado de por vida
              </span>
            </div>

            <div className="mt-[18px] flex items-baseline justify-center gap-2.5">
              <span className="font-display text-[clamp(54px,9vw,76px)] leading-none text-gold">
                {price}
              </span>
              <span className="font-body text-[17px] text-[#c9bda3]">/mes</span>
              <span className="font-body text-[19px] text-[#7d7460] line-through">{priceOld}</span>
            </div>

            <div className="mt-6 text-center font-body text-xs font-semibold uppercase tracking-[0.05em] text-[#b9a98a]">
              La tarifa fundadora cierra en
            </div>
            <Countdown deadline={deadline} />

            <WaLink origin="founding" variant="gold" className="mt-6 w-full py-[18px] text-base">
              Quiero mi plaza fundadora
            </WaLink>
            <p className="mt-3 text-center font-body text-xs text-[#8a8070]">
              Sin permanencia. La tarifa fundadora no vuelve.
            </p>
          </Reveal>

          {/* Columna Derecha: Detalles del plan */}
          <Reveal delay={0.2} className="space-y-6 lg:pl-6 text-left">
            <h3 className="font-display text-2xl text-gold uppercase tracking-wide">
              ¿Qué incluye la plaza fundadora?
            </h3>
            
            <p className="font-body text-[15px] text-white/80 leading-relaxed">
              La tarifa de socio fundador es una oportunidad única de lanzamiento. Una vez se completen las plazas, la cuota mensual volverá a su precio original de <strong className="text-white">{priceOld}</strong>.
            </p>

            <ul className="space-y-4 p-0 list-none">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-gold text-lg leading-none">✓</span>
                <span className="font-body text-[14px] text-white/85 leading-relaxed">
                  <strong className="text-white">8 clases al mes (2 clases a la semana):</strong> Elige tus clases y compagina tus estilos preferidos.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-gold text-lg leading-none">✓</span>
                <span className="font-body text-[14px] text-white/85 leading-relaxed">
                  <strong className="text-white">Precio PARA TODA LA VIDA (con condiciones):</strong> Tu cuota mensual se mantendrá congelada para siempre en 50€.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-gold text-lg leading-none">✓</span>
                <span className="font-body text-[14px] text-white/85 leading-relaxed">
                  <strong className="text-white">Acceso a eventos con preferencia:</strong> Prioridad de reserva en fiestas sociales, socials y masterclasses.
                </span>
              </li>
            </ul>

            <div className="rounded-lg border border-gold/20 bg-gold/5 p-4 text-[13px] text-[#c9bda3] font-body leading-relaxed">
              * El mantenimiento del precio de por vida se mantendrá activo siempre que la suscripción no sufra periodos de baja.
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
