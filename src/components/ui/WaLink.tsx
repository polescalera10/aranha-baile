import { buildWaLink, type WaOrigin } from "@/lib/whatsapp";
import { WaGlyph } from "@/components/ui/WaGlyph";

type Variant = "red" | "white" | "gold" | "outline";

/* Los nombres de variante se conservan por compatibilidad de API;
   el mapeo visual es ya el de NEXUS: neón sobre oscuro, texto ink en CTAs. */
const GLYPH: Record<Variant, string> = {
  red: "bg-ink",
  white: "bg-ink",
  gold: "bg-ink",
  outline: "bg-neon",
};

const WRAP: Record<Variant, string> = {
  red: "bg-neon text-ink shadow-neon hover:-translate-y-[3px] hover:shadow-glow",
  white: "bg-text-strong text-ink shadow-card hover:-translate-y-[3px]",
  gold: "bg-neon-lime text-ink shadow-glow hover:-translate-y-[3px]",
  outline: "border border-text-strong/30 text-text-strong/85 hover:bg-text-strong/10",
};

/**
 * CTA de WhatsApp. Abre wa.me con mensaje prerrellenado según el origen.
 * Microinteracción de hover (elevación + sombra) vía Tailwind; press con active.
 */
export function WaLink({
  origin,
  extra,
  children,
  variant = "red",
  showGlyph = true,
  className = "",
}: {
  origin: WaOrigin;
  extra?: string;
  children: React.ReactNode;
  variant?: Variant;
  showGlyph?: boolean;
  className?: string;
}) {
  return (
    <a
      href={buildWaLink(origin, extra)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 rounded-md font-body font-bold no-underline transition-[transform,box-shadow,background] duration-200 active:translate-y-0 active:scale-[0.99] ${WRAP[variant]} ${className}`}
    >
      {showGlyph && <WaGlyph className={GLYPH[variant]} />}
      {children}
    </a>
  );
}
