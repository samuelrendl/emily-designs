/** Join class names, dropping falsy entries. Keeps the UI components dependency-free. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
