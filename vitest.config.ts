import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Tests unitarios (Vitest + jsdom).
 * Solo cubren `tests/unit/**`; los e2e de Playwright viven en `tests/e2e/**`
 * y se ejecutan aparte con `pnpm test:e2e`.
 */
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    css: false,
    restoreMocks: true,
  },
});
