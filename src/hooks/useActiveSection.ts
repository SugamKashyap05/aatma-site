import { useState, useEffect } from "react";

/**
 * Tracks which home-page section is currently in view.
 * Returns the section id string (e.g. "about", "agar-story") or null.
 */
export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // Initial check
    const check = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      let current: string | null = null;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        if (scrollPos >= top) {
          current = section.id;
        }
      }

      // If scrolled to top, no section is active
      if (window.scrollY < 60) {
        current = null;
      }

      setActive(current);
    };

    check();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          check();
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
  }, [sectionIds]);

  return active;
}
