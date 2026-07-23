export function Card({
  title,
  action,
  className = "",
  children,
}: {
  title?: string;
  /** Slot opcional a la derecha del título (botón, badge…). */
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-lg border border-text-strong/8 bg-bg-panel p-5 shadow-soft ${className}`}
    >
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && (
            <h3 className="font-body text-[15px] font-bold normal-case tracking-normal text-text-strong">
              {title}
            </h3>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
