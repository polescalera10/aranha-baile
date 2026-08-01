import type { WaOrigin } from "@/lib/whatsapp";

/**
 * Analítica (GA4) — fuente única de IDs, claves y eventos.
 *
 * Regla RGPD/LSSI-CE: GA4 arranca con Consent Mode v2 en `denied`. Hasta que
 * el visitante acepta en el banner no se instala ninguna cookie de análisis
 * (Google envía pings sin cookies, "cookieless pings"). Ver
 * `src/components/analytics/`.
 */

/** ID de medición del data stream de GA4 (formato G-XXXXXXXXXX). Vacío = analítica apagada. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

/** Clave de localStorage donde vive la decisión del banner de cookies. */
export const CONSENT_STORAGE_KEY = "nexus-consent-analytics";

export type ConsentValue = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Lee la decisión guardada. `null` = todavía no ha decidido (hay que enseñar el banner). */
export function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    // Safari en modo privado puede lanzar al tocar localStorage.
    return null;
  }
}

/** Guarda la decisión y se la comunica a GA4 vía Consent Mode. */
export function writeConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Sin persistencia el banner reaparecerá; el consentimiento sigue siendo correcto.
  }
  window.gtag?.("consent", "update", {
    analytics_storage: value === "granted" ? "granted" : "denied",
  });
}

/**
 * Retira el consentimiento y olvida la decisión guardada: el banner volverá a
 * salir. Es el mecanismo de revocación que exige el RGPD (retirar debe ser tan
 * fácil como dar).
 */
export function clearConsent(): void {
  if (typeof window === "undefined") return;
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Sin localStorage no hay nada que borrar.
  }
}

/**
 * Envía un evento a GA4. No-op si no hay analítica cargada (ID sin configurar,
 * bloqueador de anuncios o render en servidor), así que se puede llamar sin guardas.
 */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}

/**
 * Clic en cualquier CTA de WhatsApp — la conversión nº1 de la web.
 * `origin` identifica el bloque para saber qué CTA convierte mejor.
 */
export function trackWhatsAppClick(origin: WaOrigin, label?: string): void {
  trackEvent("whatsapp_click", { cta_origin: origin, cta_label: label });
}

/** Envío correcto de un formulario de captación. */
export function trackLead(origen: string, detalle?: string): void {
  trackEvent("generate_lead", { lead_origen: origen, lead_detalle: detalle });
}
