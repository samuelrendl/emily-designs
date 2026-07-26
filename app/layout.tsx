import type { Metadata } from "next";
import { Archivo, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

/**
 * A pair, both light, per the design system: Cormorant Garamond for
 * anything that speaks (display, headings, quotes, form entry, the
 * wordmark), Archivo for anything that labels (nav, buttons, tags, credits).
 */
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600"],
  display: "swap",
});

const description =
  "Costume design for film and television by Emily Kontu — short films, theatre, costume recreations, sketches and sewing projects.";

export const metadata: Metadata = {
  title: {
    default: "Emily Kontu — Costume Design",
    template: "%s — Emily Kontu",
  },
  description,
  openGraph: {
    title: "Emily Kontu — Costume Design",
    description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${archivo.variable}`}
    >
      <body className="font-grotesk">{children}</body>
    </html>
  );
}
