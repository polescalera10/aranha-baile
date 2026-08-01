"use client";

import { trackWhatsAppClick } from "@/lib/analytics";
import { buildWaLink, type WaOrigin } from "@/lib/whatsapp";

/**
 * Enlace a WhatsApp sin estilos propios, para los sitios que ya traen su
 * clase (píldoras del footer, etc.). Misma medición que `WaLink`: emite
 * `whatsapp_click` con el origen del CTA.
 */
export function WaTrackedLink({
  origin,
  extra,
  className,
  children,
}: {
  origin: WaOrigin;
  extra?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={buildWaLink(origin, extra)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackWhatsAppClick(origin, extra)}
    >
      {children}
    </a>
  );
}
