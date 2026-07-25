export interface NavLink {
  href: string;
  label: string;
}

/**
 * `/About` keeps its original capitalised path so links already pointing at
 * the live page do not break; GitHub Pages serves paths case-sensitively.
 */
export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/About", label: "About" },
  { href: "/contact", label: "Contact" },
];
