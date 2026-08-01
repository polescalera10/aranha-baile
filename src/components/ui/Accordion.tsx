export type QA = { q: string; a: string };

/**
 * Acordeón de preguntas frecuentes.
 *
 * Implementado con `<details>` nativo A PROPÓSITO. La versión anterior era un
 * componente cliente que solo montaba la respuesta al abrir: el texto no
 * existía en el HTML servido, así que ni Google ni el buscador del navegador
 * lo veían. Afectaba a la home, a /socio-fundador y a las 30 landings de
 * campaña — cientos de palabras de contenido real invisibles.
 *
 * De paso desaparece el JavaScript: `<details>` ya es accesible por teclado y
 * anuncia el estado expandido/colapsado sin `aria-expanded`.
 */
export function Accordion({ items }: { items: QA[] }) {
  return (
    <div>
      {items.map((item) => (
        <details key={item.q} className="group border-text-strong/12 border-b">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-5 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="font-body text-text-strong m-0 text-[clamp(16px,1.6vw,18px)] font-semibold tracking-normal normal-case">
              {item.q}
            </h3>
            <span
              aria-hidden="true"
              className="font-body text-neon flex-none text-[28px] leading-none transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="font-body text-text-muted pb-[18px] text-base leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
