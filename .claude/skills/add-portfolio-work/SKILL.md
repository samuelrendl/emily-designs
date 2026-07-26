---
name: add-portfolio-work
description: Add a new credited project (short film or play) or new photos to an existing gallery category (costume recreations, sketches, sewing projects, photo projects) on the Emily Kontu portfolio site. Use whenever the client supplies new photos and/or a new production to add to the site.
---

Adds new work to this portfolio site. There are two kinds of content — figure out
which one applies before doing anything else, since they're edited differently.

- **Project** (short film or play): has a title and credits, gets its own detail
  page at `/projects/<slug>`. Lives in `utils/films.json` (key `shortFilms`) or
  `utils/plays.json` (key `plays`).
- **Loose photos**: no title/credits, shown in the gallery grid and opened in a
  lightbox. Belongs to one of four existing categories, each a `{ "urls": [...] }`
  file: `utils/costumeRecreations.json`, `utils/sketches.json`,
  `utils/sewingProjects.json`, `utils/photoProjects.json`.

`utils/portfolio.ts` is the single typed view over all of this — never edit it or
the routes/components for a routine content addition; only touch the JSON files
listed above (and `imageDimensions.json`, generated, see step 4).

If the client asks for a whole new category (something that isn't one of the six
above), that's a bigger change than this skill covers — it needs a new entry in
the `CATEGORIES` array in `utils/portfolio.ts` and possibly a new folder under
`public/photos/`. Flag that to the user rather than improvising it.

## 1. Gather what's needed

Ask the user (don't guess):

- Where the photo files are (a folder path, or files they've already placed
  somewhere you can read).
- Whether this is a new project or new photos for an existing loose-photo
  category. If a project: is it a short film or a play?
- For a project: title, year (optional — written as a trailing `(YYYY)` in the
  name, e.g. `"Scarlet (2024)"`), and any credits that apply — only the ones
  that exist for this production, don't fill in blanks:
  - `director`, `by`, `dop`, `production`, `costumes`
- For loose photos: which of the four categories, and whether there's a
  per-photo note (rare — check `CATEGORY_NOTES` in `utils/portfolio.ts` first;
  most categories have none).

## 2. Place the photo files

Follow the existing numbering convention exactly — don't invent a new one.

- **Project**: create `public/photos/<short-films|plays>/<kebab-slug>/`, then
  copy files in as `1.jpg`, `2.jpg`, ... in the order they should appear. The
  slug is the kebab-case form of the title (e.g. "My Nuclear Family" →
  `my-nuclear-family`) — check sibling folders in `public/photos/short-films/`
  or `public/photos/plays/` for the pattern first.
- **Loose photos**: list the existing files in
  `public/photos/<category>/` first, find the highest number already used, and
  continue from there (e.g. if `1.jpg`–`3.jpg` exist, new files start at
  `4.jpg`). Never renumber or overwrite existing files.
- Keep each file's original extension (this codebase has a mix of `.jpg` and
  `.jpeg` — match whatever the source file is, don't force one or the other).

## 3. Update the JSON

- **Project**: add a new entry to the `shortFilms` object in `films.json` or
  the `plays` object in `plays.json`. The object key must be **camelCase**
  (e.g. `myNewFilm`) — `utils/portfolio.ts` derives the URL slug from this key
  automatically, so don't add a separate `slug` field. Fields: `name` (title,
  plus ` (YYYY)` suffix if a year was given), only the credit fields that were
  supplied, and `photosUrls` as the ordered array of paths from step 2.
- **Loose photos**: append the new photo paths (in order) to the `urls` array
  in the relevant file. Don't touch any other entries in the array.

Match the existing JSON formatting (2-space indent) rather than reformatting
the whole file.

## 4. Regenerate image dimensions

Run:

```bash
npm run photos:dimensions
```

This is required, not optional — `utils/portfolio.ts` throws at build time for
any photo missing from `utils/imageDimensions.json`, which would break the
whole build, not just the new item.

## 5. Verify

Run `npm run lint` and `npm run build`. Confirm both succeed before calling
the task done — a broken build here means the live site fails to deploy on
the next push to `main` (see `.github/workflows/nextjs.yml`).

## 6. Summarize

Tell the user plainly what was added: the category/title, how many photos, and
the file paths touched (JSON file(s), photo folder). If it's a project, mention
the live route it'll appear at (`/projects/<slug>`).
