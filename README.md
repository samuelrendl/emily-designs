# Emily Kontu — Costume Design

Portfolio site for costume designer Emily Kontu. Next.js App Router, exported
as static files and deployed to GitHub Pages by
[`.github/workflows/nextjs.yml`](.github/workflows/nextjs.yml) on every push to
`main`.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into ./out
npm run lint
```

`npm run build` writes a fully static site to `out/`. There is no server at
runtime, which is why the contact page links to email/Instagram/IMDb rather
than posting a form.

## Adding work

Content lives in `utils/` as plain JSON, in the shape it has always had:

| File | Shape | Gets a detail page |
| --- | --- | --- |
| `films.json` | keyed productions with credits | yes, `/projects/<slug>` |
| `plays.json` | keyed productions with credits | yes, `/projects/<slug>` |
| `costumeRecreations.json` | `{ "urls": [...] }` | no — gallery + lightbox |
| `sketches.json` | `{ "urls": [...] }` | no — gallery + lightbox |
| `sewingProjects.json` | `{ "urls": [...] }` | no — gallery + lightbox |
| `photoProjects.json` | `{ "urls": [...] }` | no — gallery + lightbox |

To add a production: drop the photos in `public/photos/...`, add the entry to
`films.json` or `plays.json`, then run:

```bash
npm run photos:dimensions
```

That records each photo's intrinsic size in `utils/imageDimensions.json`, which
the masonry layout needs to reserve space before an image loads. **This step is
required** — `utils/portfolio.ts` throws at build time for any photo missing
from the map rather than shipping a collapsing layout.

A production's year can be written into its title as a trailing `(2022)`; it is
parsed out and displayed separately.

`utils/portfolio.ts` is the single typed view over all of the above — routes and
components read from it, never from the JSON directly.

## Dependency notes

`npm audit --omit=dev` reports **0 vulnerabilities** — nothing that ships to the
browser is flagged.

Two `overrides` in `package.json` are what keep it that way, since npm has no
way to hold a comment next to them:

- **`postcss`** — Next 16.2.11 pins a nested `8.4.31`, below the fix line for
  the `sourceMappingURL` path-traversal advisories. Forced to the same `8.5.x`
  the rest of the toolchain already resolves to.
- **`sharp`** — Next's image optimizer inherits libvips CVEs below `0.35.0`.
  This site exports statically with `images.unoptimized`, so sharp never runs,
  but there is no reason to ship the old copy.

`npm audit` still reports 9 high-severity advisories **in dev dependencies
only**. All nine are one `brace-expansion` DoS advisory reached through
`minimatch@3`, pulled in by ESLint and the plugins bundled inside
`eslint-config-next`. It is currently unfixable, and both routes out are dead
ends worth recording so they are not retried blindly:

- There is no patched `brace-expansion` 1.x — the advisory covers everything
  up to `5.0.7`, and `1.1.16` is the last 1.x release.
- Overriding to the patched `5.0.8` breaks ESLint outright: v5 no longer sets
  `module.exports` to the function itself, so `minimatch@3` throws
  `expand is not a function`.
- Upgrading to ESLint 10 (whose `minimatch@10` already carries a patched
  `brace-expansion`) also breaks: the `eslint-plugin-react` bundled inside
  `eslint-config-next@16` still calls `context.getFilename()`, removed in v10.

The fix has to come from `eslint-config-next` shipping plugins that support
ESLint 10. Re-check after a Next minor release.

## Design system

The visual language comes from the **Emily Costumes Design System**
(`claude.ai/design`, project `bfefc4bf`). Its tokens are ported verbatim into
the `:root` block of [`app/globals.css`](app/globals.css) and surfaced as
Tailwind theme values in [`tailwind.config.ts`](tailwind.config.ts), so a token
edit updates every utility.

- `components/ui/` — the ported components (Button, Tag, GalleryCard, Input,
  TextArea) plus Masonry and Lightbox. Import from `components/ui`, not from
  the individual files.
- Composite type tokens are exposed as `.type-h1`, `.type-body`, `.type-label`
  and so on, defined in `app/globals.css`.
- One typeface throughout: Courier Prime, loaded via `next/font`. Hierarchy
  comes from size, weight, tracking and case — never from a second family.

Deliberate departures from the system, each explained in a comment at the
relevant source line:

- `Button` spells out every surface/variant pair rather than layering a "dark"
  patch, which otherwise leaves two competing hover rules on one element.
- Selected gallery filters invert to an ink fill instead of using `tone="rust"`;
  in the final black & white palette `--rust` equals `--black-ink`, so the
  system's selected and unselected chips are pixel-identical.
- `GalleryCard` takes a `photo` object instead of a bare `src`, because
  `next/image` needs intrinsic dimensions.
- The mobile nav toggle is a `MENU` / `CLOSE` text label, following the
  system's "text labels first, no icon set" rule.
