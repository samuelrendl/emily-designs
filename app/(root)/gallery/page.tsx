import type { Metadata } from "next";
import { GalleryBrowser } from "@/components/gallery/GalleryBrowser";
import { getGalleryItems } from "@/utils/portfolio";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Every costume project by Emily Kontu — short films, plays, costume recreations, sketches, sewing projects and photo projects.",
};

export default function GalleryPage() {
  return (
    <section className="mx-auto max-w-[1800px] px-4 py-12 sm:px-12">
      <h1 className="type-h1">Gallery</h1>
      <p className="type-body mt-3 max-w-[560px] text-secondary">
        Filter by the kind of work. Productions open a page of credits;
        everything else opens full size.
      </p>

      <div className="mt-8">
        <GalleryBrowser items={getGalleryItems()} />
      </div>
    </section>
  );
}
