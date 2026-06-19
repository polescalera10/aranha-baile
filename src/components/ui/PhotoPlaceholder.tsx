/**
 * Placeholder de imagen con rayas sutiles + etiqueta monospace.
 * PLACEHOLDER: sustituir por <Image> de next/image (con width/height explícitos
 * y lazy load) cuando haya fotografía real a color de gente bailando.
 */

type Tint = "warm" | "red" | "mix" | "dark";

const TINTS: Record<Tint, string> = {
  warm: "repeating-linear-gradient(135deg,rgba(232,168,124,.30) 0 14px,rgba(232,168,124,.10) 14px 28px)",
  red: "repeating-linear-gradient(135deg,rgba(192,32,42,.16) 0 12px,rgba(192,32,42,.05) 12px 24px)",
  mix: "repeating-linear-gradient(135deg,rgba(192,32,42,.14) 0 12px,rgba(232,168,124,.12) 12px 24px)",
  dark: "repeating-linear-gradient(135deg,rgba(232,168,124,.32) 0 14px,rgba(232,168,124,.10) 14px 28px)",
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
      className={`relative flex items-end overflow-hidden bg-bg-sand ${className}`}
      style={{ backgroundImage: TINTS[tint] }}
      role="img"
      aria-label={label.replace(/[[\]]/g, "").trim()}
    >
      <span
        className={`rounded-md bg-white/80 px-2 py-[3px] font-mono text-[10px] text-text-faint ${labelClassName}`}
      >
        {label}
      </span>
    </div>
  );
}
