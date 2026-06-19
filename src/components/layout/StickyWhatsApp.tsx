"use client";

import { useEffect, useState } from "react";
import { buildWaLink } from "@/lib/whatsapp";
import { WaGlyph } from "@/components/ui/WaGlyph";

/**
 * Botón WhatsApp sticky, siempre accesible en móvil.
 * Aparece tras pasar el hero (>560px de scroll) deslizándose desde abajo.
 */
export function StickyWhatsApp() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown((window.scrollY || window.pageYOffset || 0) > 560);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center p-4 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
      style={{ transform: shown ? "translateY(0)" : "translateY(140%)" }}
    >
      <a
        href={buildWaLink("sticky")}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto relative flex items-center gap-[11px] rounded-full bg-red px-7 py-4 font-body text-[15px] font-bold text-white no-underline shadow-red"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full bg-red motion-safe:animate-[pulsering_2.6s_ease-out_infinite]"
        />
        <WaGlyph size={18} className="bg-white" />
        Reserva tu clase de prueba
      </a>
    </div>
  );
}
