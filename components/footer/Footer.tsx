import Link from "next/link";

/**
 * Ink footer band. Rendered on the server — the year resolves at build time,
 * so this needs neither client JS nor state to hold a constant.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-primary bg-ink text-primary-inverse">
      <div className="mx-auto flex max-w-[1800px] flex-col items-center gap-3 px-4 py-8 sm:flex-row sm:justify-between sm:px-8">
        <small className="text-[11px] uppercase tracking-wider">
          &copy; {currentYear} Emily Kontu. All rights reserved.
        </small>
        <small className="text-[11px] uppercase tracking-wider text-secondary-inverse">
          Made by{" "}
          <Link
            href="https://www.samuelrendl.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-inverse underline decoration-[var(--smoke)] underline-offset-4 transition-colors duration-fast ease-standard hover:text-primary-inverse"
          >
            Samuel Rendl
          </Link>
        </small>
      </div>
    </footer>
  );
}

export default Footer;
