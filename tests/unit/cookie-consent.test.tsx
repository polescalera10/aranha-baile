import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CookieBanner } from "@/components/analytics/CookieBanner";
import { CONSENT_STORAGE_KEY, readConsent, trackEvent, writeConsent } from "@/lib/analytics";

const gtag = vi.fn();

beforeEach(() => {
  window.localStorage.clear();
  window.gtag = gtag;
  gtag.mockClear();
});

/**
 * El banner es la barrera legal (LSSI-CE 22.2): si se rompe, GA4 seguiría en
 * `denied` — pero si dejara de salir, o "Rechazar" concediera consentimiento,
 * estaríamos midiendo sin permiso.
 */
describe("CookieBanner", () => {
  it("se muestra cuando el visitante aún no ha decidido", async () => {
    render(<CookieBanner />);
    expect(await screen.findByRole("dialog", { name: "Consentimiento de cookies" })).toBeInTheDocument();
  });

  it("no se muestra si ya hay una decisión guardada", async () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
    render(<CookieBanner />);
    // Un tick para que corra el efecto de montaje que lee localStorage.
    await Promise.resolve();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("aceptar guarda el consentimiento y lo concede en Consent Mode", async () => {
    const user = userEvent.setup();
    render(<CookieBanner />);

    await user.click(await screen.findByRole("button", { name: "Aceptar" }));

    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe("granted");
    expect(gtag).toHaveBeenCalledWith("consent", "update", { analytics_storage: "granted" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("rechazar guarda la negativa y mantiene el almacenamiento denegado", async () => {
    const user = userEvent.setup();
    render(<CookieBanner />);

    await user.click(await screen.findByRole("button", { name: "Rechazar" }));

    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe("denied");
    expect(gtag).toHaveBeenCalledWith("consent", "update", { analytics_storage: "denied" });
  });
});

describe("helpers de analítica", () => {
  it("readConsent ignora valores corruptos", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "yes-please");
    expect(readConsent()).toBeNull();
  });

  it("writeConsent persiste y notifica", () => {
    writeConsent("granted");
    expect(readConsent()).toBe("granted");
  });

  it("trackEvent no rompe si GA no está cargado (bloqueador o ID sin configurar)", () => {
    window.gtag = undefined;
    expect(() => trackEvent("whatsapp_click", { cta_origin: "hero" })).not.toThrow();
  });
});
