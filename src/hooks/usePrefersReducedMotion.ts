import { useState, useEffect } from "react";

/**
 * Returns true when the user has requested reduced motion via OS settings.
 * Uses a mounted state to avoid SSR issues (ssr: true initially, false after mount).
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setReduced(false);
      return;
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return reduced;
}
