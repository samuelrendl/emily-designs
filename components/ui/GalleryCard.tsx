import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/utils/portfolio";
import { cn } from "./cn";

/**
 * Masonry gallery pin — a photo with a dark caption plate that slides up on
 * hover, like a printed contact sheet. Square corners, thin ink frame.
 *
 * Deviation from the design system's GalleryCard: it takes a `photo` object
 * rather than a bare `src`/`height` pair, because next/image needs the
 * intrinsic width and height to reserve layout space (see
 * scripts/generate-image-dimensions.mjs). Everything else — the frame, the
 * dim-on-hover, the caption plate — matches the design system component.
 */
export interface GalleryCardProps {
  photo: Photo;
  title: string;
  caption?: string;
  /** Renders the card as a link to a project detail page. */
  href?: string;
  /** Renders the card as a button, e.g. to open a lightbox. */
  onClick?: () => void;
  /** Hint to the browser for the card's rendered width across breakpoints. */
  sizes?: string;
  priority?: boolean;
}

const DEFAULT_SIZES =
  "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw";

export function GalleryCard({
  photo,
  title,
  caption,
  href,
  onClick,
  sizes = DEFAULT_SIZES,
  priority = false,
}: GalleryCardProps) {
  const interactive = Boolean(href || onClick);

  const body = (
    <>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={cn(
          "block h-auto w-full transition-[filter] duration-base ease-standard",
          interactive && "group-hover:brightness-[0.85]",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 px-[14px] py-3",
          "bg-gradient-to-t from-[rgba(17,17,17,0.88)] to-transparent text-primary-inverse",
          "transition-[opacity,transform] duration-base ease-standard",
          // The hidden and always-shown states must not both be emitted, or
          // which one applies comes down to stylesheet order.
          interactive
            ? "translate-y-[6px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            : "translate-y-0 opacity-100",
        )}
      >
        <div className="text-[13px] font-bold uppercase tracking-wide">
          {title}
        </div>
        {caption && (
          <div className="mt-0.5 text-[11px] text-secondary-inverse">
            {caption}
          </div>
        )}
      </div>
    </>
  );

  const frame =
    "group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-sm border border-primary shadow-photo";

  if (href) {
    return (
      <Link href={href} className={cn(frame, "no-underline")}>
        {body}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cn(frame, "text-left")}>
        {body}
      </button>
    );
  }

  return <div className={frame}>{body}</div>;
}
