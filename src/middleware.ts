import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * ⚠️ Este fichero DEBE vivir en `src/`. En un proyecto con carpeta `src/`,
 * Next.js solo reconoce `src/middleware.ts`: en la raíz se compila a nada y
 * el área privada se queda sin middleware sin que nada avise.
 * Comprobación: `.next/server/middleware-manifest.json` no debe estar vacío.
 */
export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Solo el área privada. La web pública es estática y no necesita sesión:
  // meterla aquí añadiría una llamada a Supabase Auth en cada visita.
  matcher: ["/area-privada", "/area-privada/:path*"],
};
