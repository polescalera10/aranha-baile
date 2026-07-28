import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Callback del acceso por email (enlace mágico / OTP de Supabase).
 *
 * Supabase puede mandar el enlace en dos formatos según la configuración del
 * proyecto, así que se aceptan los dos:
 *   · `?code=…`                  → flujo PKCE (exchangeCodeForSession)
 *   · `?token_hash=…&type=…`     → enlace verificado por el servidor (verifyOtp)
 *
 * Al terminar redirige a /area-privada; el middleware reenvía al panel que
 * corresponda según el rol del perfil.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  // `next` solo se acepta como ruta interna: un `//evil.com` también empieza
  // por "/" y el navegador lo resolvería como dominio externo (open redirect).
  const nextParam = searchParams.get("next") ?? "";
  const next =
    nextParam.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : "/area-privada";

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${next}`);
    console.error("[callback] exchangeCodeForSession:", error.message);
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type: type as "magiclink" | "email" | "recovery" | "invite" | "signup",
      token_hash: tokenHash,
    });
    if (!error) return NextResponse.redirect(`${origin}${next}`);
    console.error("[callback] verifyOtp:", error.message);
  }

  const failed = new URL("/area-privada", origin);
  failed.searchParams.set("error", "enlace");
  return NextResponse.redirect(failed);
}
