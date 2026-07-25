import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";

/**
 * One family throughout, per the design system: hierarchy comes from size,
 * weight, tracking and case rather than from mixing typefaces.
 */
const courierPrime = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-courier-prime",
  weight: ["400", "700"],
  style: ["normal", "italic"],
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
    <html lang="en" className={courierPrime.variable}>
      <body className="font-typewriter">{children}</body>
    </html>
  );
}
