import type { ReactNode } from "react";
import { cn } from "./cn";

/**
 * CSS-column masonry, matching the design system's Pinterest-style gallery
 * layout. Children must set `break-inside-avoid` — GalleryCard does.
 *
 * Columns are stepped down at narrow widths so photos never render smaller
 * than they read; the design system's kit assumes three columns throughout,
 * which is unusable on a phone.
 */
export interface MasonryProps {
  children: ReactNode;
  className?: string;
}

export function Masonry({ children, className }: MasonryProps) {
  return (
    <div className={cn("columns-1 gap-4 sm:columns-2 xl:columns-3", className)}>
      {children}
    </div>
  );
}
