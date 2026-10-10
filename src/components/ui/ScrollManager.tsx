import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollManager — resets scroll position on route changes.
 *
 * - Navigating to a non-home route always scrolls to top.
 * - Navigating to home ("/") WITHOUT a hash scrolls to top.
 * - Navigating to home WITH a hash lets Navbar's hash effect handle
 *   the section scroll (no top-scroll here to avoid conflict).
 */
export function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const isHome =
      location.pathname === "/" || location.pathname === "/aatma-site/";
    const hasHash = window.location.hash.length > 0;

    // If navigating to home with a hash, let Navbar's effect handle it
    if (isHome && hasHash) return;

    // Otherwise, scroll to top on route change.
    // "instant" overrides the CSS scroll-behavior: smooth for route changes.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);

  return null;
}

export default ScrollManager;
