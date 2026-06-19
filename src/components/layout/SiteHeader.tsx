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
 * Cabecera sólida para las páginas de soporte (no-landing).
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-ink/95 backdrop-blur">
      <div className="container-aranha flex items-center justify-between py-4">
        <Logo size={22} />
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-body text-[13px] font-semibold text-white/75 no-underline transition-colors hover:text-white"
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
