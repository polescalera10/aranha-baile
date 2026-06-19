import { buildWaLink, type WaOrigin } from "@/lib/whatsapp";
import { WaGlyph } from "@/components/ui/WaGlyph";

type Variant = "red" | "white" | "gold" | "outline";

const GLYPH: Record<Variant, string> = {
  red: "bg-white",
  white: "bg-red",
  gold: "bg-[#1a1208]",
  outline: "bg-white",
};

const WRAP: Record<Variant, string> = {
  red: "bg-red text-white shadow-red hover:-translate-y-[3px] hover:shadow-[0_20px_44px_-8px_rgba(192,32,42,0.78)]",
  white: "bg-white text-red shadow-[0_18px_44px_-12px_rgba(0,0,0,0.45)] hover:-translate-y-[3px]",
  gold: "bg-gold text-[#1a1208] shadow-gold hover:-translate-y-[3px]",
  outline: "border border-white/30 text-white/85 hover:bg-white/10",
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
