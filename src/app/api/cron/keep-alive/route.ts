import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * GET /api/cron/keep-alive — disparado por Vercel Cron una vez al día
 * (ver vercel.json). Hace una lectura trivial a Supabase para que el
 * proyecto registre actividad y no entre en pausa automática por
 * inactividad (límite del plan Free: pausa a los 7 días sin uso).
 *
 * No es una garantía oficial de Supabase, solo un ping de actividad — la
 * única forma garantizada de desactivar la pausa es el plan Pro.
 *
 * Vercel añade automáticamente `Authorization: Bearer $CRON_SECRET` en las
 * llamadas de sus Cron Jobs cuando la env var CRON_SECRET existe.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error("[keep-alive] CRON_SECRET no configurado.");
    return NextResponse.json({ error: "CRON_SECRET no configurado." }, { status: 500 });
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("modalidades").select("slug").limit(1);

  if (error) {
    console.error("[keep-alive] ping error:", error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, at: new Date().toISOString() });
}
