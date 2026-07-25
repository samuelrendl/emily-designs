import type { ReactNode } from "react";
import Footer from "@/components/footer/Footer";
import Nav from "@/components/navigation/Nav";

/**
 * Shell for every page: ink header, page content, ink footer. `<main>` wraps
 * only the page body so the landmark does not swallow the nav and footer.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
