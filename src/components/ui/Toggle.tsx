"use client";

/**
 * Interruptor accesible (role="switch") con zona táctil grande:
 * pensado para pasar lista y marcar pagos con el pulgar en el móvil.
 */
export function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Etiqueta accesible del interruptor (no visible). */
  label: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center disabled:pointer-events-none disabled:opacity-55 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`relative h-7 w-12 rounded-full transition-colors ${
          checked ? "bg-accent" : "bg-text-strong/20"
        }`}
      >
        <span
          className={`absolute top-1 size-5 rounded-full bg-white shadow-soft transition-[left] ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </span>
    </button>
  );
}
