import { Reveal } from "@/components/ui/Reveal";

/** Manejo de la objeción típica de este ICP/dolor, respondida en una frase. */
export function CampanaObjecion({ pregunta, respuesta }: { pregunta: string; respuesta: string }) {
  return (
    <section className="bg-bg-base py-[clamp(40px,7vw,72px)]">
      <div className="container-nexus max-w-[720px]">
        <Reveal className="rounded-lg border border-neon/20 bg-bg-panel p-[clamp(24px,4vw,36px)]">
          <p className="font-body text-[13px] font-bold uppercase tracking-[0.1em] text-neon-mint">{pregunta}</p>
          <p className="mt-3 text-balance font-display text-2xl leading-snug text-text-strong sm:text-3xl">
            {respuesta}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
