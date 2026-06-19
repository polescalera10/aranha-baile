import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";

/**
 * Refresca la sesión de Supabase en cada request y protege /area-privada/**.
 * Devuelve la NextResponse (con cookies actualizadas) que el middleware reenvía.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isPrivate = pathname.startsWith("/area-privada");
  const isLogin = pathname === "/area-privada";

  // Zona protegida sin sesión → al login.
  if (isPrivate && !isLogin && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/area-privada";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Ya logueado entrando al login → redirige a su panel por rol.
  if (isLogin && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = profile?.role ?? "alumno";
    const url = request.nextUrl.clone();
    url.pathname = `/area-privada/${role}`;
    return NextResponse.redirect(url);
  }

  return response;
}
