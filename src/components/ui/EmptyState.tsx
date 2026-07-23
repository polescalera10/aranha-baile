export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  /** Icono opcional (SVG inline); si no se pasa, se muestra un punto suave. */
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-text-strong/20 bg-bg-panel/60 px-6 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
        {icon ?? <span aria-hidden="true" className="size-2.5 rounded-full bg-accent" />}
      </div>
      <p className="mt-4 font-body text-base font-bold text-text-strong">{title}</p>
      {description && (
        <p className="mt-1.5 max-w-[42ch] font-body text-sm text-text-muted">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
