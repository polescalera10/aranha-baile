import { Logo } from "@/components/layout/Logo";
import { WaLink } from "@/components/ui/WaLink";
import Link from "next/link";

const NAV = [
  { href: "/clases", label: "Clases" },
  { href: "/profesores", label: "Profesores" },
  { href: "/eventos", label: "Eventos" },
  { href: "/horarios", label: "Horarios" },
  { href: "/faq", label: "FAQ" },
];

/**
 * Cabecera transparente sobre el hero (posición absoluta).
 * Usada por la landing. Otras páginas pueden usar SiteHeader (sólido).
 */
export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="container-nexus flex items-center justify-between py-6">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-body text-[13px] font-semibold text-white/75 no-underline transition-colors hover:text-neon"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <WaLink origin="nav" variant="outline" showGlyph={false} className="px-[18px] py-[9px] text-[13px] font-semibold">
          WhatsApp
        </WaLink>
      </div>
    </header>
  );
}

