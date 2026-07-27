import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// El matchMedia de jsdom no expone el API heredado addListener/removeListener,
// que es justo el que usa framer-motion para prefers-reduced-motion. Se
// reemplaza entero (no solo si falta) para que el MediaQueryList sea completo.
// Función normal, no vi.fn(): `restoreMocks` del vitest.config vaciaría la
// implementación tras el primer test y matchMedia devolvería undefined.
const noop = () => {};
window.matchMedia = ((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: noop,
  removeListener: noop,
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: () => false,
})) as typeof window.matchMedia;

if (!("IntersectionObserver" in window)) {
  class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds: readonly number[] = [];
  }
  vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
}

afterEach(() => {
  cleanup();
});
