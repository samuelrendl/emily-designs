import type { ReactNode } from "react";
import { cn } from "./cn";

export type TagTone = "ink" | "muted" | "accent";

const toneStyles: Record<TagTone, string> = {
  ink: "text-primary border-subtle",
  muted: "text-secondary border-subtle",
  accent: "text-accent border-accent",
};

const tagBase =
  "inline-flex items-center border bg-transparent rounded-sm px-[10px] py-1 " +
  "font-grotesk font-medium text-[10px] uppercase tracking-widest";

export interface TagProps {
  children: ReactNode;
  tone?: TagTone;
}

/**
 * Hairline chip for an era, medium or role credit. Grotesque caps, widest
 * tracking.
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
 * One deliberate departure from the design system's filter row: it renders a
 * real <button> rather than a clickable <span>, so the row is reachable by
 * keyboard and announced as a pressable control.
 *
 * Selection is signalled with the real accent colour (text + underline rule),
 * matching the system's own filter treatment. An earlier version of this
 * component inverted to an ink fill instead, because the previous
 * black-and-white palette had `--rust` collapse onto `--ink`, leaving
 * selected and unselected chips pixel-identical — that constraint no longer
 * applies now that accent is a distinct colour again.
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
          ? "bg-transparent text-accent border-accent"
          : "bg-transparent text-primary border-subtle hover:text-accent hover:border-accent",
      )}
    >
      {children}
    </button>
  );
}
