import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import { site } from "@/lib/site";
import { JsonLd, localBusinessLd } from "@/components/seo/JsonLd";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Escuela de baile en Vilanova i la Geltrú`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: `${site.name} — Escuela de baile en Vilanova i la Geltrú`,
    description: site.description,
    url: site.url,
  },
  alternates: { canonical: "/" },
};

/**
 * Negro de marca en la UI del navegador (barra de estado móvil).
 * `viewportFit: "cover"` habilita las variables env(safe-area-inset-*) que usan
 * el WhatsApp sticky y el menú móvil para no quedar bajo el indicador de inicio.
 */
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${anton.variable} ${inter.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <JsonLd data={localBusinessLd()} />
      </body>
    </html>
  );
}
