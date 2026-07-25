"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { Photo } from "@/utils/portfolio";

/**
 * Full-bleed photo viewer for gallery images that have no detail page.
 *
 * Not a design-system component — the system ships no Dialog — but built to
 * its rules: the sanctioned `--bg-overlay` token for the scrim, no blur,
 * square corners, text labels instead of icons, and short mechanical motion.
 */
export interface LightboxProps {
  photos: Photo[];
  index: number;
  caption?: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  photos,
  index,
  caption,
  onClose,
  onNavigate,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const photo = photos[index];
  const hasSiblings = photos.length > 1;

  const goTo = useCallback(
    (next: number) => {
      onNavigate((next + photos.length) % photos.length);
    },
    [onNavigate, photos.length],
  );

  // Move focus into the dialog on open and hand it back on close, so keyboard
  // users are not dropped at the top of the document.
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => previouslyFocused.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (!hasSiblings) return;
      if (event.key === "ArrowRight") goTo(index + 1);
      if (event.key === "ArrowLeft") goTo(index - 1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, goTo, index, hasSiblings]);

  // Stop the page behind the overlay from scrolling, restoring whatever the
  // document had set rather than assuming it was `auto`.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  if (!photo) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      tabIndex={-1}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col bg-overlay p-4 outline-none sm:p-8"
    >
      <div className="flex shrink-0 items-center justify-between gap-4">
        <span className="type-label text-secondary-inverse">
          {hasSiblings ? `${index + 1} / ${photos.length}` : ""}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="type-label cursor-pointer border-0 bg-transparent p-2 text-primary-inverse transition-colors duration-fast ease-standard hover:text-ochre-bright"
        >
          Close
        </button>
      </div>

      <div
        // The photo and its controls are interactive; clicking them must not
        // fall through to the backdrop's close handler.
        onClick={(event) => event.stopPropagation()}
        className="flex min-h-0 flex-1 items-center justify-center py-4"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="100vw"
          className="max-h-full w-auto max-w-full rounded-sm object-contain shadow-lift"
        />
      </div>

      <div
        onClick={(event) => event.stopPropagation()}
        className="flex shrink-0 items-center justify-between gap-4"
      >
        {hasSiblings ? (
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="type-label cursor-pointer border-0 bg-transparent p-2 text-primary-inverse transition-colors duration-fast ease-standard hover:text-ochre-bright"
          >
            &larr; Prev
          </button>
        ) : (
          <span />
        )}

        {caption && (
          <span className="type-caption text-center text-secondary-inverse">
            {caption}
          </span>
        )}

        {hasSiblings ? (
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="type-label cursor-pointer border-0 bg-transparent p-2 text-primary-inverse transition-colors duration-fast ease-standard hover:text-ochre-bright"
          >
            Next &rarr;
          </button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
