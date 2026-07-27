import { expect, test } from "@playwright/test";

/**
 * El bug que originó esta suite: en móvil la nav estaba en `hidden md:flex`
 * y no existía menú alternativo, así que por debajo de 768px la web no tenía
 * ninguna navegación. Estos tests impiden que vuelva a pasar.
 */

const MOBILE = { width: 390, height: 844 };
const DESKTOP = { width: 1280, height: 800 };

test.describe("navegación en móvil", () => {
  test.use({ viewport: MOBILE });

  test("la landing ofrece un botón de menú accesible", async ({ page }) => {
    await page.goto("/");

    const toggle = page.getByTestId("mobile-nav-toggle");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    // Objetivo táctil mínimo de 44×44 px.
    const box = await toggle.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  });

  test("el menú abre y muestra los enlaces del sitio", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("mobile-nav-toggle").click();

    const panel = page.getByTestId("mobile-nav-panel");
    await expect(panel).toBeVisible();

    for (const label of ["Clases", "Profesores", "Eventos", "Horarios", "FAQ"]) {
      await expect(panel.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("desde el menú se puede navegar de verdad a otra página", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("mobile-nav-toggle").click();
    await page.getByTestId("mobile-nav-panel").getByRole("link", { name: "Clases" }).click();

    await expect(page).toHaveURL(/\/clases$/);
    // Tras navegar el panel se cierra solo: si no, taparía la página de destino.
    await expect(page.getByTestId("mobile-nav-panel")).toBeHidden();
  });

  test("el menú se cierra con Escape", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("mobile-nav-toggle").click();
    await expect(page.getByTestId("mobile-nav-panel")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByTestId("mobile-nav-panel")).toBeHidden();
    await expect(page.getByTestId("mobile-nav-toggle")).toBeFocused();
  });

  test("el menú se cierra volviendo a pulsar el botón", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByTestId("mobile-nav-toggle");

    await toggle.click();
    await expect(page.getByTestId("mobile-nav-panel")).toBeVisible();
    await toggle.click();
    await expect(page.getByTestId("mobile-nav-panel")).toBeHidden();
  });

  test("el menú incluye el CTA de WhatsApp", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("mobile-nav-toggle").click();

    const cta = page.getByTestId("mobile-nav-panel").getByRole("link", {
      name: /clase de prueba/i,
    });
    await expect(cta).toHaveAttribute("href", /^https:\/\/wa\.me\/\d+\?text=/);
  });

  test("las páginas de soporte también tienen menú móvil", async ({ page }) => {
    await page.goto("/faq");
    await page.getByTestId("mobile-nav-toggle").click();

    const panel = page.getByTestId("mobile-nav-panel");
    await expect(panel.getByRole("link", { name: "Intensivos" })).toBeVisible();
  });

  test("con el menú abierto el fondo no se desplaza", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("mobile-nav-toggle").click();
    await expect(page.getByTestId("mobile-nav-panel")).toBeVisible();

    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .toBe("hidden");
  });
});

test.describe("navegación en escritorio", () => {
  test.use({ viewport: DESKTOP });

  test("los enlaces se ven en línea y no hay botón de menú", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("mobile-nav-toggle")).toBeHidden();
    const header = page.locator("header").first();
    await expect(header.getByRole("link", { name: "Clases" })).toBeVisible();
    await expect(header.getByRole("link", { name: "FAQ" })).toBeVisible();
  });
});
