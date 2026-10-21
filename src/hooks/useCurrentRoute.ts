import { useLocation } from "react-router-dom";

/**
 * Maps URL pathnames to normalized page identifiers.
 * Unrecognized paths return null.
 */
const PAGE_PATH_MAP: Record<string, string> = {
  "/": "home",
  "/press": "press",
  "/history": "history",
  "/policy": "policy",
  "/research": "research",
  "/books": "books",
  "/news": "news",
  "/resources": "resources",
};

/**
 * Pure helper: maps a pathname to a page identifier.
 * Returns null for unrecognized paths.
 */
export function getPageFromPath(pathname: string): string | null {
  if (PAGE_PATH_MAP[pathname]) return PAGE_PATH_MAP[pathname];
  // /news/:slug → "news"
  if (pathname.startsWith("/news/")) return "news";
  return null;
}

/**
 * Reactive hook that returns the current page identifier
 * based on the browser's route. Re-renders on route change.
 *
 * Returns: "home" | "press" | "history" | "policy" | "research" | "books" | "news" | "resources" | null
 */
export function useCurrentRoute(): string | null {
  const location = useLocation();
  return getPageFromPath(location.pathname);
}
