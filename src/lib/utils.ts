// Tiny class-name joiner (keeps the project dependency-light)
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// URL-safe slug: strips accents (Dún Laoghaire → dun-laoghaire), lowercases,
// and collapses anything non-alphanumeric to single hyphens.
export function slugify(input: string) {
  return input
    .normalize("NFD") // split accented chars into base + combining diacritic
    .replace(/[̀-ͯ]/g, "") // remove the combining diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // non-alphanumeric → hyphen
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}
