import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "./cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonSurface = "light" | "dark";

/**
 * Editorial action button: tracked-out grotesque caps, square corners, no
 * shadow — presses with a mechanical 1px nudge rather than a scale.
 */
const base =
  "inline-flex items-center justify-center gap-2 border font-grotesk font-medium uppercase tracking-wider rounded-sm cursor-pointer " +
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
    "bg-ink text-primary-inverse border-primary " +
    "enabled:hover:bg-accent enabled:hover:border-accent",
  "light-secondary":
    "bg-transparent text-primary border-subtle " +
    "enabled:hover:bg-ink enabled:hover:text-primary-inverse enabled:hover:border-primary",
  "light-ghost":
    "bg-transparent text-primary border-transparent underline decoration-[var(--border-subtle)] underline-offset-4 " +
    "enabled:hover:text-accent enabled:hover:decoration-accent",
  "dark-primary":
    "bg-bone-bright text-primary border-[var(--bone-bright)] " +
    "enabled:hover:bg-accent-pale enabled:hover:border-accent-pale",
  "dark-secondary":
    "bg-transparent text-primary-inverse border-[var(--graphite)] " +
    "enabled:hover:bg-bone-bright enabled:hover:text-primary enabled:hover:border-[var(--bone-bright)]",
  "dark-ghost":
    "bg-transparent text-primary-inverse border-transparent underline decoration-[var(--graphite)] underline-offset-4 " +
    "enabled:hover:text-accent-inverse enabled:hover:decoration-accent-pale",
};

const linkVariants: Record<SurfaceVariant, string> = {
  "light-primary":
    "bg-ink text-primary-inverse border-primary " +
    "hover:bg-accent hover:border-accent",
  "light-secondary":
    "bg-transparent text-primary border-subtle " +
    "hover:bg-ink hover:text-primary-inverse hover:border-primary",
  "light-ghost":
    "bg-transparent text-primary border-transparent underline decoration-[var(--border-subtle)] underline-offset-4 " +
    "hover:text-accent hover:decoration-accent",
  "dark-primary":
    "bg-bone-bright text-primary border-[var(--bone-bright)] " +
    "hover:bg-accent-pale hover:border-accent-pale",
  "dark-secondary":
    "bg-transparent text-primary-inverse border-[var(--graphite)] " +
    "hover:bg-bone-bright hover:text-primary hover:border-[var(--bone-bright)]",
  "dark-ghost":
    "bg-transparent text-primary-inverse border-transparent underline decoration-[var(--graphite)] underline-offset-4 " +
    "hover:text-accent-inverse hover:decoration-accent-pale",
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
