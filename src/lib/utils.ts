// Tiny class-name joiner (keeps the project dependency-light)
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
