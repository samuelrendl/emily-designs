"use client";

import type { ChangeEvent } from "react";
import { cn } from "./cn";

/**
 * Ruled fields — a line on the page, not a boxed input. Serif entry,
 * grotesque label.
 *
 * Ported from the design system for completeness. The site currently has no
 * form: it deploys as a static export to GitHub Pages, so there is no server
 * to receive a submission, and Contact links to email/Instagram/IMDb instead.
 * These are ready if a form endpoint is ever added.
 */
const fieldWrap = "flex flex-col gap-1.5";

const labelStyles =
  "font-grotesk font-medium text-[10px] uppercase tracking-widest text-secondary";

const fieldBase =
  "font-serif text-[20px] text-primary bg-transparent rounded-none " +
  "border-0 border-b border-primary px-0.5 py-2 outline-none " +
  "transition-[border-color,border-width] duration-fast ease-standard " +
  "focus:border-b-2 focus:border-accent placeholder:text-smoke-light";

export interface InputProps {
  labelText?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "tel";
}

export function Input({
  labelText,
  placeholder,
  value,
  onChange,
  type = "text",
}: InputProps) {
  return (
    <label className={fieldWrap}>
      {labelText && <span className={labelStyles}>{labelText}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={fieldBase}
      />
    </label>
  );
}

export interface TextAreaProps {
  labelText?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

export function TextArea({
  labelText,
  placeholder,
  value,
  onChange,
  rows = 5,
}: TextAreaProps) {
  return (
    <label className={fieldWrap}>
      {labelText && <span className={labelStyles}>{labelText}</span>}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={cn(fieldBase, "resize-y leading-relaxed")}
      />
    </label>
  );
}
