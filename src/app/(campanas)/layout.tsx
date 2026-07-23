import { Logo } from "@/components/layout/Logo";

/**
 * Layout aislado de las landings de campaña (/l/[icp]/[dolor]).
 * Sin nav ni footer completos del sitio: solo logo + contenido. Mobile-first,
 * foco total en el CTA. El WhatsApp sticky lo pone cada página (necesita el
 * mensaje propio del dolor).
 */
export default function CampanasLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-ink">
      <header className="container-nexus flex items-center py-5">
        <Logo size={28} />
      </header>
      {children}
    </div>
  );
}
