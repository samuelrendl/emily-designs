"use client";

import { useMemo, useState } from "react";
import { GalleryCard, Lightbox, Masonry, TagButton } from "@/components/ui";
import {
  CATEGORIES,
  type CategoryId,
  type GalleryItem,
  categoryLabel,
  getItemCategory,
} from "@/utils/portfolio";

type Filter = CategoryId | "all";

interface OpenPhoto {
  category: CategoryId;
  index: number;
}

/**
 * The gallery's filter row and masonry.
 *
 * Credited productions link through to their detail page; loose photos have
 * no page of their own, so they open in a lightbox that pages through the
 * rest of that category.
 */
export function GalleryBrowser({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [openPhoto, setOpenPhoto] = useState<OpenPhoto | null>(null);

  // Only offer a filter for categories that actually have work in them.
  const availableCategories = useMemo(() => {
    const present = new Set(items.map(getItemCategory));
    return CATEGORIES.filter((category) => present.has(category.id));
  }, [items]);

  const shown = useMemo(
    () =>
      filter === "all"
        ? items
        : items.filter((item) => getItemCategory(item) === filter),
    [items, filter],
  );

  // Photos of the open category, so the lightbox can page through them.
  const lightboxPhotos = useMemo(() => {
    if (!openPhoto) return [];
    return items
      .filter(
        (item) =>
          item.kind === "photo" && item.loose.category === openPhoto.category,
      )
      .map((item) => (item as Extract<GalleryItem, { kind: "photo" }>).loose);
  }, [items, openPhoto]);

  return (
    <>
      <div
        role="group"
        aria-label="Filter by category"
        className="flex flex-wrap gap-2.5"
      >
        <TagButton selected={filter === "all"} onClick={() => setFilter("all")}>
          All
        </TagButton>
        {availableCategories.map((category) => (
          <TagButton
            key={category.id}
            selected={filter === category.id}
            onClick={() => setFilter(category.id)}
          >
            {category.label}
          </TagButton>
        ))}
      </div>

      <p className="type-caption mt-4 text-secondary" aria-live="polite">
        {shown.length} {shown.length === 1 ? "item" : "items"}
      </p>

      <div className="mt-6">
        <Masonry>
          {shown.map((item) => {
            if (item.kind === "project") {
              return (
                <GalleryCard
                  key={item.key}
                  photo={item.cover}
                  title={item.project.title}
                  caption={[
                    item.project.year,
                    categoryLabel(item.project.category),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                  href={`/projects/${item.project.slug}`}
                />
              );
            }

            const { loose } = item;
            return (
              <GalleryCard
                key={item.key}
                photo={loose.photo}
                title={categoryLabel(loose.category)}
                caption={loose.note}
                onClick={() =>
                  setOpenPhoto({
                    category: loose.category,
                    index: items
                      .filter(
                        (candidate) =>
                          candidate.kind === "photo" &&
                          candidate.loose.category === loose.category,
                      )
                      .findIndex(
                        (candidate) =>
                          candidate.kind === "photo" &&
                          candidate.loose.id === loose.id,
                      ),
                  })
                }
              />
            );
          })}
        </Masonry>
      </div>

      {openPhoto && lightboxPhotos.length > 0 && (
        <Lightbox
          photos={lightboxPhotos.map((loose) => loose.photo)}
          index={openPhoto.index}
          caption={
            lightboxPhotos[openPhoto.index]?.note ??
            categoryLabel(openPhoto.category)
          }
          onClose={() => setOpenPhoto(null)}
          onNavigate={(index) => setOpenPhoto({ ...openPhoto, index })}
        />
      )}
    </>
  );
}
