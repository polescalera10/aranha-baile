/**
 * Placeholder de imagen con rayas sutiles + etiqueta monospace.
 * PLACEHOLDER: sustituir por <Image> de next/image (con width/height explícitos
 * y lazy load) cuando haya fotografía real a color de gente bailando.
 */

type Tint = "warm" | "red" | "mix" | "dark";

/* Nombres de tinte conservados por compatibilidad de API; los colores salen
   de los tokens de marca vía color-mix (nada de colores sueltos). */
const TINTS: Record<Tint, string> = {
  warm: "repeating-linear-gradient(135deg,color-mix(in srgb,var(--color-neon-mint) 18%,transparent) 0 14px,color-mix(in srgb,var(--color-neon-mint) 6%,transparent) 14px 28px)",
  red: "repeating-linear-gradient(135deg,color-mix(in srgb,var(--color-neon) 16%,transparent) 0 12px,color-mix(in srgb,var(--color-neon) 5%,transparent) 12px 24px)",
  mix: "repeating-linear-gradient(135deg,color-mix(in srgb,var(--color-neon) 14%,transparent) 0 12px,color-mix(in srgb,var(--color-neon-lime) 10%,transparent) 12px 24px)",
  dark: "repeating-linear-gradient(135deg,color-mix(in srgb,var(--color-neon-mint) 12%,transparent) 0 14px,color-mix(in srgb,var(--color-neon-mint) 4%,transparent) 14px 28px)",
};

export function PhotoPlaceholder({
  label,
  tint = "warm",
  className = "",
  labelClassName = "",
}: {
  label: string;
  tint?: Tint;
  className?: string;
  labelClassName?: string;
}) {
  return (
    <div
      className={`relative flex items-end overflow-hidden bg-bg-elevated ${className}`}
      style={{ backgroundImage: TINTS[tint] }}
      role="img"
      aria-label={label.replace(/[[\]]/g, "").trim()}
    >
      <span
        className={`rounded-md bg-ink/75 px-2 py-[3px] font-mono text-[10px] text-text-muted ${labelClassName}`}
      >
        {label}
      </span>
    </div>
  );
}
