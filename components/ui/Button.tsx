import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "./cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonSurface = "light" | "dark";

/**
 * Typewritten, all-caps action button. Square corners, no shadow — presses
 * like a typewriter key (nudges down 1px rather than scaling).
 */
const base =
  "inline-flex items-center justify-center gap-2 border font-typewriter font-bold uppercase tracking-wider rounded-sm cursor-pointer " +
  "transition-[transform,background-color,color,border-color] duration-fast ease-standard active:translate-y-px";

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-[14px] py-2 text-[11px]",
  md: "px-[22px] py-3 text-[13px]",
  lg: "px-[30px] py-4 text-[14px]",
};

/**
 * Every surface/variant pair is spelled out as one complete class string.
 *
 * Two reasons this is not composed from smaller pieces: Tailwind only emits
 * classes it can find written out in full, and layering a "dark surface"
 * patch over the light styles would leave both hover rules on the element,
 * where the winner is decided by stylesheet order rather than by intent.
 *
 * Buttons and links need different hover selectors — `:enabled` matches form
 * controls only, so an `enabled:hover:` class silently does nothing on an
 * `<a>`. Buttons get the `enabled:` guard so a disabled button stays inert;
 * links, which cannot be disabled, use a plain `hover:`.
 */
type SurfaceVariant = `${ButtonSurface}-${ButtonVariant}`;

const buttonVariants: Record<SurfaceVariant, string> = {
  "light-primary":
    "bg-[var(--accent-primary)] text-primary-inverse border-[var(--accent-primary)] " +
    "enabled:hover:bg-[var(--accent-primary-hover)] enabled:hover:border-[var(--accent-primary-hover)]",
  "light-secondary":
    "bg-transparent text-primary border-ochre " +
    "enabled:hover:bg-ink enabled:hover:text-primary-inverse enabled:hover:border-primary",
  "light-ghost":
    "bg-transparent text-primary border-transparent underline decoration-[var(--border-ochre)] underline-offset-4 " +
    "enabled:hover:text-accent",
  "dark-primary":
    "bg-paper text-primary border-[var(--paper-white)] " +
    "enabled:hover:bg-[var(--paper-dim)] enabled:hover:border-[var(--paper-dim)]",
  "dark-secondary":
    "bg-transparent text-primary-inverse border-ochre " +
    "enabled:hover:bg-paper enabled:hover:text-primary enabled:hover:border-[var(--paper-white)]",
  "dark-ghost":
    "bg-transparent text-primary-inverse border-transparent underline decoration-[var(--border-ochre)] underline-offset-4 " +
    "enabled:hover:text-ochre-bright",
};

const linkVariants: Record<SurfaceVariant, string> = {
  "light-primary":
    "bg-[var(--accent-primary)] text-primary-inverse border-[var(--accent-primary)] " +
    "hover:bg-[var(--accent-primary-hover)] hover:border-[var(--accent-primary-hover)]",
  "light-secondary":
    "bg-transparent text-primary border-ochre " +
    "hover:bg-ink hover:text-primary-inverse hover:border-primary",
  "light-ghost":
    "bg-transparent text-primary border-transparent underline decoration-[var(--border-ochre)] underline-offset-4 " +
    "hover:text-accent",
  "dark-primary":
    "bg-paper text-primary border-[var(--paper-white)] " +
    "hover:bg-[var(--paper-dim)] hover:border-[var(--paper-dim)]",
  "dark-secondary":
    "bg-transparent text-primary-inverse border-ochre " +
    "hover:bg-paper hover:text-primary hover:border-[var(--paper-white)]",
  "dark-ghost":
    "bg-transparent text-primary-inverse border-transparent underline decoration-[var(--border-ochre)] underline-offset-4 " +
    "hover:text-ochre-bright",
};

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  surface?: ButtonSurface;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  surface = "light",
  disabled = false,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        base,
        sizeStyles[size],
        buttonVariants[`${surface}-${variant}`],
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:active:translate-y-0",
      )}
    >
      {children}
    </button>
  );
}

export interface ButtonLinkProps {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  surface?: ButtonSurface;
  external?: boolean;
}

/**
 * Navigational twin of Button. Kept separate rather than adding `href` to
 * Button so Button's declared prop contract stays exactly as the design
 * system specifies it.
 */
export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  surface = "light",
  external = false,
}: ButtonLinkProps) {
  const className = cn(
    base,
    sizeStyles[size],
    linkVariants[`${surface}-${variant}`],
    variant === "ghost" ? "" : "no-underline",
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
