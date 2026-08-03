/**
 * Destino seguro para una redirección tras el login.
 *
 * `next` viene de la URL, así que solo se acepta como ruta interna del propio
 * sitio. ⚠️ No basta con "empieza por / y no por //": el navegador normaliza la
 * barra invertida a barra normal en la cabecera `Location`, así que `/\evil.com`
 * acabaría resolviéndose como https://evil.com (open redirect → phishing con un
 * clon del área privada). Se exige que el segundo carácter no sea ni `/` ni `\`,
 * y además se resuelve contra el origen para comprobar que no se escapa.
 * Ver docs/auditoria-seguridad-2026-08-03.md (A4).
 */
export function safeNext(
  nextParam: string,
  origin: string,
  fallback = "/area-privada",
): string {
  if (!/^\/(?![/\\])[^\s\\]*$/.test(nextParam)) return fallback;
  try {
    const target = new URL(nextParam, origin);
    return target.origin === origin ? `${target.pathname}${target.search}` : fallback;
  } catch {
    return fallback;
  }
}
