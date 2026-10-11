import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export { type ClassValue };
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolve a path inside `public/` against the app's deploy base.
 *
 * The site is served from a subpath on GitHub Pages (`/aatma-site/`), so a
 * root-absolute path like `/research/foo.png` resolves to the DOMAIN root and
 * 404s in production even though it works in dev (where base is `/`).
 *
 * Always use this for files in `public/`:
 *   assetUrl("research/hero.webp")  ->  "/aatma-site/research/hero.webp" in CI
 *                                       "/research/hero.webp"           in dev
 *
 * Note: files under `src/assets/` are handled by Vite's import pipeline and
 * must NOT go through this — import them instead so hashing still applies.
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  // Vite may emit "./" for a relative build; normalise it away so we always
  // produce a usable absolute path.
  const root = base === "./" || base === "" ? "/" : base;
  return `${root.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}
