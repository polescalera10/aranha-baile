/**
 * Tabla semántica con estilo de tokens. En móvil no se rompe:
 * el wrapper permite scroll horizontal sin desbordar la página.
 */
export function Table({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-text-strong/8 bg-white shadow-soft">
      <table className={`w-full min-w-max border-collapse text-left ${className}`}>
        {children}
      </table>
    </div>
  );
}

export function THead({ children }: { children: React.ReactNode }) {
  return <thead className="border-b border-text-strong/10 bg-bg-cream">{children}</thead>;
}

export function TBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-text-strong/6">{children}</tbody>;
}

export function Tr({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <tr className={className}>{children}</tr>;
}

export function Th({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <th
      scope="col"
      className={`px-4 py-3 font-body text-xs font-bold uppercase tracking-[0.08em] text-text-muted ${className}`}
    >
      {children}
    </th>
  );
}

export function Td({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <td className={`px-4 py-3 font-body text-sm text-text-body ${className}`}>
      {children}
    </td>
  );
}
