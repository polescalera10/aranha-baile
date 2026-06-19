import type { Metadata } from "next";
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
