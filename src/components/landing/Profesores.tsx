import { Reveal } from "@/components/ui/Reveal";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

const TAGS = ["Te corrigen el detalle", "Te conocen por tu nombre", "Formación constante"];

export function Profesores() {
  return (
    <section className="bg-bg-panel py-[clamp(64px,9vw,120px)]">
      <div className="container-nexus">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(24px,4vw,56px)]">
          <Reveal>
            {/* TODO: foto de grupo real (equipo + alumnos). Etiqueta oculta en producción (sr-only). */}
            <PhotoPlaceholder
              label="[ foto de grupo · el equipo + alumnos ]"
              tint="warm"
              className="min-h-[360px] rounded-xl p-3.5"
              labelClassName="sr-only"
            />
          </Reveal>

          <div>
            <Reveal as="span" className="block font-body text-xs font-bold uppercase tracking-[0.18em] text-neon">
              Quién te acompaña
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-3.5 max-w-[16ch] text-balance font-display text-[clamp(32px,5vw,58px)] leading-[0.98] text-text-strong">
                Detrás de cada paso, los mejores
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-[18px] max-w-[54ch] font-body text-[clamp(16px,1.4vw,19px)] leading-[1.65] text-text-body">
                No te suelta nadie. Un equipo de profesores en formación constante que cuida el
                detalle de cada movimiento, corrige con cariño y adapta la clase a tu nivel. Aquí te
                conocen por tu nombre desde el primer día.
              </p>
            </Reveal>
            <Reveal delay={0.18} className="mt-[22px] flex flex-wrap gap-2.5">
              {TAGS.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-bg-elevated px-[17px] py-[11px] font-body text-[13px] font-semibold text-text-body"
                >
                  {t}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
