import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // PLACEHOLDER: añade aquí el host de Supabase Storage cuando subas imágenes reales.
    // remotePatterns: [{ protocol: "https", hostname: "<project-ref>.supabase.co" }],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Server Actions usadas por los formularios (lead / founding / contacto).
    serverActions: {
      bodySizeLimit: "1mb",
    },
  },
};

export default nextConfig;
