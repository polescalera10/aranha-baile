/**
 * Bloques tipográficos para las páginas legales (aviso legal, privacidad, cookies).
 * Mantienen la jerarquía visual del sitio usando solo design tokens.
 */

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="font-display text-[clamp(22px,2.6vw,30px)] leading-tight text-text-strong">
        {title}
      </h2>
      <div className="mt-3 flex flex-col gap-3">{children}</div>
    </section>
  );
}

export function LegalP({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-[72ch] font-body text-[15px] leading-relaxed text-text-body">{children}</p>
  );
}

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="max-w-[72ch] list-disc space-y-1.5 pl-5 font-body text-[15px] leading-relaxed text-text-body">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

/** Dato pendiente del titular. Visible a propósito: no debe llegar así a producción. */
export function LegalTodo({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-xs bg-gold/25 px-1 font-body font-semibold text-text-strong">
      [TODO: {children}]
    </mark>
  );
}

/** Aviso de borrador en cabecera de cada página legal. */
export function LegalDraftNote() {
  return (
    <div className="mb-10 rounded-lg border border-dashed border-text-strong/25 bg-white/60 p-5 font-body text-sm leading-relaxed text-text-muted">
      Borrador pendiente de: (1) completar los datos del titular marcados como{" "}
      <LegalTodo>dato</LegalTodo> y (2) revisión jurídica final antes de publicar.
    </div>
  );
}
