import type { Metadata, Viewport } from "next";
import { Inter_Tight, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--f-sans", display: "swap" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], style: ["italic"], variable: "--f-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--f-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0A0620", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#conteudo">
          Pular para o conteúdo
        </a>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
