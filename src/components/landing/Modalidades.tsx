import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

type Modalidad = { slug: string; nombre: string; descripcion: string | null };

export function Modalidades({ modalidades }: { modalidades: Modalidad[] }) {
  return (
    <section className="bg-bg-panel pb-[clamp(64px,9vw,120px)]">
      <div className="container-nexus">
        <Reveal as="span" className="block font-body text-xs font-bold uppercase tracking-[0.18em] text-neon">
          Qué se baila
        </Reveal>

        <div className="mt-[26px] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[18px]">
          {modalidades.map((m, i) => (
            <Reveal key={m.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/clases/${m.slug}`}
                className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-xl border border-white/6 bg-bg-elevated bg-[repeating-linear-gradient(135deg,rgba(48,228,236,.10)_0_14px,rgba(48,228,236,.03)_14px_28px)] text-white no-underline transition-[border-color,box-shadow] duration-300 hover:border-neon/35 hover:shadow-neon"
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,.05)_30%,rgba(10,10,10,.88)_100%)] transition-opacity duration-300 group-hover:opacity-90" />
                {/* TODO: foto a color de la modalidad. Marcador oculto en producción:
                <div className="absolute left-3.5 top-3.5 rounded-md bg-black/30 px-2 py-[3px] font-mono text-[10px] text-white/75">
                  [ foto · {m.nombre.toLowerCase()} ]
                </div>
                */}
                <div className="relative z-[1] p-7">
                  <span className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-neon-mint">
                    Modalidad
                  </span>
                  <h3 className="my-2 font-display text-[clamp(34px,4.5vw,52px)] leading-[0.95]">
                    {m.nombre}
                  </h3>
                  <p className="max-w-[36ch] font-body text-[15px] leading-snug text-white/80">
                    {m.descripcion}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
