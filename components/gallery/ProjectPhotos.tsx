"use client";

import { useState } from "react";
import { GalleryCard, Lightbox, Masonry } from "@/components/ui";
import type { Photo } from "@/utils/portfolio";

/** A project's full photo set, opening full size in the lightbox. */
export function ProjectPhotos({
  photos,
  title,
}: {
  photos: Photo[];
  title: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <Masonry>
        {photos.map((photo, index) => (
          <GalleryCard
            key={photo.src}
            photo={photo}
            title={title}
            caption={
              photos.length > 1 ? `${index + 1} / ${photos.length}` : undefined
            }
            onClick={() => setOpenIndex(index)}
            priority={index === 0}
          />
        ))}
      </Masonry>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          caption={title}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
