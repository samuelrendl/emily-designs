import type { Config } from "tailwindcss";

/**
 * Theme values map onto the design-system custom properties declared in
 * app/globals.css. Editing a token there updates every utility here, so the
 * site stays in sync with the Emily Costumes design system.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: "var(--font-serif)",
        grotesk: "var(--font-grotesk)",
      },
      colors: {
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        graphite: "var(--graphite)",
        bone: "var(--bone)",
        "bone-dim": "var(--bone-dim)",
        "bone-bright": "var(--bone-bright)",
        smoke: "var(--smoke)",
        "smoke-light": "var(--smoke-light)",
        accent: "var(--accent)",
        "accent-pale": "var(--accent-pale)",
        "accent-deep": "var(--accent-deep)",
        overlay: "var(--bg-overlay)",
      },
      textColor: {
        primary: "var(--text-primary)",
        "primary-inverse": "var(--text-primary-inverse)",
        secondary: "var(--text-secondary)",
        "secondary-inverse": "var(--text-secondary-inverse)",
        accent: "var(--text-accent)",
        "accent-inverse": "var(--text-accent-inverse)",
      },
      borderColor: {
        primary: "var(--border-primary)",
        subtle: "var(--border-subtle)",
        accent: "var(--border-accent)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        photo: "var(--shadow-photo)",
        lift: "var(--shadow-lift)",
      },
      letterSpacing: {
        tight: "var(--tracking-tight)",
        normal: "var(--tracking-normal)",
        wide: "var(--tracking-wide)",
        wider: "var(--tracking-wider)",
        widest: "var(--tracking-widest)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        base: "var(--duration-base)",
        slow: "var(--duration-slow)",
      },
    },
  },
  plugins: [],
};

export default config;
