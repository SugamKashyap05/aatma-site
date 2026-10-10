import { useState, useEffect } from "react";

/**
 * Returns the current window.scrollY, updated via rAF-throttled scroll listener.
 * Avoids reading window.scrollY directly during render (stale value).
 */
export function useScrollY() {
  const [scrollY, setScrollY] = useState(() =>
    typeof window !== "undefined" ? window.scrollY : 0
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return scrollY;
}
