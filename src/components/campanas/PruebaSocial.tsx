import { Reveal } from "@/components/ui/Reveal";

/**
 * Prueba social cualitativa y honesta — SOLO se renderiza si la landing trae
 * `pruebaSocial`. Nunca cifras, reseñas ni resultados inventados.
 */
export function PruebaSocial({ texto }: { texto: string }) {
  return (
    <section className="bg-bg-panel py-[clamp(32px,5vw,56px)]">
      <div className="container-nexus max-w-[620px] text-center">
        <Reveal>
          <p className="font-body text-[15px] italic leading-relaxed text-text-muted">{texto}</p>
        </Reveal>
      </div>
    </section>
  );
}
