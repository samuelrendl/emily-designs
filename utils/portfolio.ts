/**
 * The portfolio's single typed view over the content files.
 *
 * The JSON files stay in their original hand-edited shape so adding a
 * production means editing one familiar file — this module adapts them into
 * the model the gallery, detail pages and home page consume.
 *
 * Two kinds of content exist:
 *  - Projects (short films, plays) carry a title and real credits, so they
 *    get their own detail route at /projects/[slug].
 *  - Loose photos (sketches, sewing, recreations, photo projects) have no
 *    title or credits; they appear in the gallery and open in a lightbox.
 */
import costumeRecreationsData from "./costumeRecreations.json";
import filmsData from "./films.json";
import imageDimensions from "./imageDimensions.json";
import photoProjectsData from "./photoProjects.json";
import playsData from "./plays.json";
import sewingProjectsData from "./sewingProjects.json";
import sketchesData from "./sketches.json";

export const CATEGORIES = [
  { id: "short-films", label: "Short Films" },
  { id: "plays", label: "Plays" },
  { id: "costume-recreations", label: "Costume Recreations" },
  { id: "sketches", label: "Sketches" },
  { id: "sewing-projects", label: "Sewing Projects" },
  { id: "photo-projects", label: "Photo Projects" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((category) => category.id === id)!.label;
}

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/** Credit lines, in the order they should be displayed. */
export const CREDIT_LABELS = [
  ["director", "Director"],
  ["by", "By"],
  ["dop", "DoP"],
  ["production", "Production"],
  ["costumes", "Costumes"],
] as const;

export type CreditKey = (typeof CREDIT_LABELS)[number][0];

export type Credits = Partial<Record<CreditKey, string>>;

export interface Project {
  slug: string;
  title: string;
  year?: number;
  category: CategoryId;
  credits: Credits;
  photos: Photo[];
}

export interface LoosePhoto {
  id: string;
  category: CategoryId;
  photo: Photo;
  /** Additional attribution shown alongside the photo, when there is any. */
  note?: string;
}

export type GalleryItem =
  | { kind: "project"; key: string; project: Project; cover: Photo }
  | { kind: "photo"; key: string; loose: LoosePhoto };

/** Extra attribution that belongs to a whole category rather than one photo. */
const CATEGORY_NOTES: Partial<Record<CategoryId, string>> = {
  "photo-projects": "Makeup by Nimica artistry",
};

const dimensions: Record<string, { width: number; height: number }> =
  imageDimensions;

function measure(src: string, alt: string): Photo {
  const size = dimensions[src];
  if (!size) {
    throw new Error(
      `No intrinsic dimensions recorded for "${src}". ` +
        `Run \`npm run photos:dimensions\` after adding or renaming photos.`,
    );
  }
  return { src, alt, width: size.width, height: size.height };
}

/** camelCase JSON keys become stable kebab-case URL slugs. */
function toSlug(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

/**
 * Several titles carry their year in the text, e.g. "(B)locked! (2021)".
 * Only a trailing parenthesised year is treated as a year, so a title that
 * legitimately starts with a bracket keeps it.
 */
function splitTitleAndYear(name: string): { title: string; year?: number } {
  const match = name.match(/^(.*?)\s*\((\d{4})\)\s*$/);
  if (!match) return { title: name.trim() };
  return { title: match[1].trim(), year: Number(match[2]) };
}

interface RawProject {
  name: string;
  photosUrls?: string[];
  director?: string;
  by?: string;
  dop?: string;
  production?: string;
  costumes?: string;
}

function toProjects(
  raw: Record<string, RawProject>,
  category: CategoryId,
): Project[] {
  return Object.entries(raw).map(([key, entry]) => {
    const { title, year } = splitTitleAndYear(entry.name);
    const urls = entry.photosUrls ?? [];
    return {
      slug: toSlug(key),
      title,
      year,
      category,
      credits: {
        director: entry.director,
        by: entry.by,
        dop: entry.dop,
        production: entry.production,
        costumes: entry.costumes,
      },
      photos: urls.map((src, index) =>
        measure(
          src,
          urls.length > 1
            ? `${title} — photo ${index + 1} of ${urls.length}`
            : title,
        ),
      ),
    };
  });
}

function toLoosePhotos(urls: string[], category: CategoryId): LoosePhoto[] {
  const label = categoryLabel(category);
  return urls.map((src, index) => ({
    id: `${category}-${index + 1}`,
    category,
    note: CATEGORY_NOTES[category],
    photo: measure(
      src,
      urls.length > 1
        ? `${label} — photo ${index + 1} of ${urls.length}`
        : label,
    ),
  }));
}

const projects: Project[] = [
  ...toProjects(filmsData.shortFilms, "short-films"),
  ...toProjects(playsData.plays, "plays"),
];

const loosePhotos: LoosePhoto[] = [
  ...toLoosePhotos(costumeRecreationsData.urls, "costume-recreations"),
  ...toLoosePhotos(sketchesData.urls, "sketches"),
  ...toLoosePhotos(sewingProjectsData.urls, "sewing-projects"),
  ...toLoosePhotos(photoProjectsData.urls, "photo-projects"),
];

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Everything the gallery can show, projects first so credited work leads.
 * A project with no photos would have no cover to render, so it is skipped.
 */
export function getGalleryItems(): GalleryItem[] {
  return [
    ...projects
      .filter((project) => project.photos.length > 0)
      .map<GalleryItem>((project) => ({
        kind: "project",
        key: `project-${project.slug}`,
        project,
        cover: project.photos[0],
      })),
    ...loosePhotos.map<GalleryItem>((loose) => ({
      kind: "photo",
      key: `photo-${loose.id}`,
      loose,
    })),
  ];
}

export function getItemCategory(item: GalleryItem): CategoryId {
  return item.kind === "project" ? item.project.category : item.loose.category;
}

/** The credits present on a project, already paired with their display label. */
export function creditEntries(credits: Credits): Array<[string, string]> {
  return CREDIT_LABELS.flatMap(([key, label]) => {
    const value = credits[key];
    return value ? [[label, value] as [string, string]] : [];
  });
}
