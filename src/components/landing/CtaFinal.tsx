import { Reveal } from "@/components/ui/Reveal";
import { WaLink } from "@/components/ui/WaLink";

export function CtaFinal() {
  return (
    <section className="bg-red py-[clamp(70px,10vw,130px)] text-white">
      <div className="mx-auto w-full max-w-[780px] px-[clamp(20px,5vw,56px)] text-center">
        <Reveal as="span" className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-white/80">
          Último paso
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-3.5 font-display text-[clamp(52px,12vw,110px)] leading-[0.9]">
            ¿Empezamos?
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 font-body text-[clamp(16px,1.5vw,19px)] leading-relaxed text-white/88">
            Tu primera clase de prueba está a un mensaje de distancia.
          </p>
        </Reveal>
        <Reveal delay={0.18} className="mt-[30px] flex justify-center">
          <WaLink origin="cta-final" variant="white" className="px-[34px] py-5 text-[clamp(16px,1.6vw,18px)]">
            Escríbenos por WhatsApp
          </WaLink>
        </Reveal>
        <p className="mt-3.5 font-body text-[13px] text-white/72">Respondemos rápido. De verdad.</p>
      </div>
    </section>
  );
}
