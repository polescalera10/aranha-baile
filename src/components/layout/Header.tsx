import { Logo } from "@/components/layout/Logo";
import { WaLink } from "@/components/ui/WaLink";

/**
 * Cabecera transparente sobre el hero (posición absoluta).
 * Usada por la landing. Otras páginas pueden usar SiteHeader (sólido).
 */
export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="container-aranha flex items-center justify-between py-6">
        <Logo />
        <WaLink origin="nav" variant="outline" showGlyph={false} className="px-[18px] py-[9px] text-[13px] font-semibold">
          WhatsApp
        </WaLink>
      </div>
    </header>
  );
}
