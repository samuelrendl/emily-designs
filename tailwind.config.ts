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
        typewriter: "var(--font-typewriter)",
      },
      colors: {
        ink: "var(--black-ink)",
        "ink-soft": "var(--black-soft)",
        charcoal: "var(--charcoal)",
        paper: "var(--paper)",
        "paper-dim": "var(--paper-dim)",
        smoke: "var(--smoke)",
        "smoke-light": "var(--smoke-light)",
        ochre: "var(--ochre)",
        "ochre-bright": "var(--ochre-bright)",
        "ochre-dim": "var(--ochre-dim)",
        overlay: "var(--bg-overlay)",
      },
      textColor: {
        primary: "var(--text-primary)",
        "primary-inverse": "var(--text-primary-inverse)",
        secondary: "var(--text-secondary)",
        "secondary-inverse": "var(--text-secondary-inverse)",
        accent: "var(--text-accent)",
      },
      borderColor: {
        primary: "var(--border-primary)",
        subtle: "var(--border-subtle)",
        ochre: "var(--border-ochre)",
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
        "inset-frame": "var(--shadow-inset-frame)",
      },
      letterSpacing: {
        tight: "var(--tracking-tight)",
        normal: "var(--tracking-normal)",
        wide: "var(--tracking-wide)",
        wider: "var(--tracking-wider)",
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
