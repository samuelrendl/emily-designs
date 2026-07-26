/**
 * Flat config. Next 16 removed the `next lint` command and ESLint 9 no longer
 * reads .eslintrc.json, so linting now runs through the ESLint CLI directly
 * (`npm run lint`).
 */
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

/**
 * Adherence rules, translated from the design system's own
 * `_adherence.oxlintrc.json` (this project lints with ESLint, not oxlint, so
 * the two rules that fit are re-expressed as native ESLint rules below).
 *
 * The oxlintrc also bans any bare `\d+px` literal, to catch styling that
 * bypasses the token system. That rule isn't ported: this codebase expresses
 * the design system's exact type scale as Tailwind arbitrary-value classes
 * (`text-[20px]`, `px-[14px]`, etc.), so every px literal in a className
 * string here *is* the token value, not a bypass of it — the rule would
 * fire on almost every component.
 */
const config = [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    files: ["components/**/*.{ts,tsx}", "app/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "warn",
        {
          patterns: [
            {
              group: ["**/components/ui/Button", "**/components/ui/Tag", "**/components/ui/Input", "**/components/ui/GalleryCard", "**/components/ui/Lightbox", "**/components/ui/Masonry"],
              message:
                "Import design-system components from '@/components/ui', not component internals.",
            },
          ],
        },
      ],
      "no-restricted-syntax": [
        "warn",
        {
          selector: "Literal[value=/#[0-9a-fA-F]{3,8}\\b/]",
          message: "Raw hex color — use a design-system color token via var().",
        },
      ],
    },
  },
  {
    files: ["components/ui/index.ts"],
    rules: { "no-restricted-imports": "off" },
  },
];

export default config;
