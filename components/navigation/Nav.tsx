"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/constants/navLinks";
import { cn } from "@/components/ui/cn";

/**
 * Site header — wordmark plus horizontal nav on an ink band.
 *
 * The design system uses no icon set: "text labels first, and if a glyph is
 * unavoidable, source it from a CDN icon set". The mobile toggle is
 * therefore a typewritten MENU / CLOSE label rather than a hamburger glyph,
 * which also makes it a real button instead of a clickable <svg>.
 */
export function Nav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // A route change must never leave the overlay covering the new page —
  // including on browser back/forward, which no click handler sees. Adjusting
  // during render rather than in an effect avoids a second render pass that
  // would briefly paint the old menu over the new route.
  if (pathname !== menuPathname) {
    setMenuPathname(pathname);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    if (!isMenuOpen) return;

    // Restore whatever overflow the document already had rather than
    // hard-coding "auto", which would clobber a page-level setting.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-primary bg-ink text-primary-inverse">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[1800px] items-center justify-between gap-6 px-4 py-4 sm:px-8"
      >
        <Link href="/" className="no-underline">
          <span className="block text-base font-bold uppercase tracking-wider sm:text-lg">
            Emily Kontu
          </span>
          <span className="mt-1 block text-[10px] uppercase tracking-wider text-secondary-inverse sm:text-[11px]">
            Costume Design for Film &amp; Television
          </span>
        </Link>

        <ul className="hidden items-center gap-7 sm:flex">
          {navLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "border-b-2 pb-1 text-xs font-bold uppercase tracking-wider no-underline",
                  "transition-colors duration-fast ease-standard hover:text-ochre-bright",
                  isActive(item.href)
                    ? "border-b-[var(--ochre-bright)] text-ochre-bright"
                    : "border-b-transparent text-primary-inverse",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="cursor-pointer border border-[var(--paper-white)] bg-transparent px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-primary-inverse transition-colors duration-fast ease-standard hover:bg-paper hover:text-primary sm:hidden"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-0 z-50 flex flex-col items-center justify-center gap-10 bg-ink sm:hidden"
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "p-4 text-2xl font-bold uppercase tracking-wider no-underline",
                isActive(item.href)
                  ? "text-ochre-bright"
                  : "text-primary-inverse",
              )}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              toggleRef.current?.focus();
            }}
            className="absolute right-4 top-4 cursor-pointer border border-[var(--paper-white)] bg-transparent px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-primary-inverse"
          >
            Close
          </button>
        </div>
      )}
    </header>
  );
}

export default Nav;
