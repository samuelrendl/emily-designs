import type { ReactNode } from "react";
import { cn } from "./cn";

export type TagTone = "ink" | "ochre" | "rust";

const toneStyles: Record<TagTone, string> = {
  ink: "text-primary border-primary",
  ochre: "text-[var(--text-ochre)] border-ochre",
  rust: "text-accent border-[var(--text-accent)]",
};

const tagBase =
  "inline-flex items-center border bg-transparent rounded-sm px-[9px] py-1 " +
  "font-typewriter font-bold text-[11px] uppercase tracking-wider";

export interface TagProps {
  children: ReactNode;
  tone?: TagTone;
}

/**
 * Small bordered chip for categorizing a project — medium, discipline or
 * role. Square corners, uppercase, typewritten.
 */
export function Tag({ children, tone = "ink" }: TagProps) {
  return <span className={cn(tagBase, toneStyles[tone])}>{children}</span>;
}

export interface TagButtonProps {
  children: ReactNode;
  selected?: boolean;
  onClick: () => void;
}

/**
 * Interactive twin of Tag, used for gallery filters.
 *
 * Two deliberate departures from the design system's filter row:
 *
 * 1. It renders a real <button> rather than a clickable <span>, so the row is
 *    reachable by keyboard and announced as a pressable control.
 * 2. Selection inverts the chip instead of switching it to `tone="rust"`.
 *    Once the palette went pure black & white, `--rust` collapsed to the same
 *    `#111111` as `--black-ink`, which left the system's selected and
 *    unselected chips pixel-identical. Inverting to an ink fill keeps the
 *    state visible without introducing a colour the brand does not have.
 */
export function TagButton({
  children,
  selected = false,
  onClick,
}: TagButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        tagBase,
        "cursor-pointer transition-colors duration-fast ease-standard",
        selected
          ? "bg-ink text-primary-inverse border-primary"
          : "bg-transparent text-primary border-primary hover:border-ochre hover:text-[var(--text-ochre)]",
      )}
    >
      {children}
    </button>
  );
}
