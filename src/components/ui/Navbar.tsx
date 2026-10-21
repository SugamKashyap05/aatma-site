import { Link, useLocation, useNavigate } from "react-router-dom";
import { AATMA } from "@/data/content";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollY } from "@/hooks/useScrollY";
import { useCurrentRoute } from "@/hooks/useCurrentRoute";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { NAV_HOME_SECTIONS, NAV_PAGE_LINKS } from "@/data/navigation";

const HOME_SECTIONS = NAV_HOME_SECTIONS;
const PAGE_LINKS = NAV_PAGE_LINKS;

const SECTION_IDS = HOME_SECTIONS.map((s) => s.id);

/**
 * Wraps a link target in the deploy base.
 *
 * React Router handles this for `<Link to>` automatically, but this site also
 * uses plain `<a href>` in a few places (in-page anchors, cross-page
 * navigation, download links). A root-absolute target like `/policy` resolves
 * against the DOMAIN root rather than `/aatma-site/`, so it 404s on GitHub
 * Pages in production while still working in dev, where the base is `/`.
 *
 * `assetUrl()` in `@/lib/utils` exists for files inside `public/`; this is the
 * same rule for app routes. In dev both resolve to `/path`, so it is a no-op
 * there.
 */
export function routeUrl(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const root = base === "./" || base === "" ? "" : base.replace(/\/+$/, "");
  return `${root}${path.startsWith("/") ? path : `/${path}`}`;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection(SECTION_IDS);
  const currentPage = useCurrentRoute();
  const reducedMotion = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hasOpenedRef = useRef(false);

  const isHome = location.pathname === "/" || location.pathname === "/aatma-site/";
  const scrollY = useScrollY();
  const onHome = isHome && scrollY < 60 && !location.hash;

  /**
   * Home sections are only reachable from `/` itself; there is no
   * `/aatma-site/#section` route (that trailing-slash form is treated as an
   * unknown path by the router). The scroll-spy effect below only runs on `/`,
   * so an off-home navigation lands at the top of the home page instead of the
   * section it was asked for — hence `/#section`, which this site has always
   * used for cross-page anchors.
   */
  const goToSection = (sectionId: string) => {
    if (isHome) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(routeUrl(`/#${sectionId}`));
    }
  };

  // Handle hash-based navigation: when not on home, goToSection navigates
  // to '/#sectionId'. On home, scroll directly to the section element.
  // The effect below handles the cross-page case by waiting for the route
  // change to complete (location updates trigger re-render), then scrolling.
  useEffect(() => {
    if (!isHome) return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    // Use requestAnimationFrame to ensure the DOM is fully rendered
    // after the route change before attempting to scroll.
    const rafId = requestAnimationFrame(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    return () => cancelAnimationFrame(rafId);
  }, [location, isHome]);

  // Close menu on Escape key + lock body scroll when open
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialogRef.current?.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Focus management for the modal drawer.
  // The drawer declares aria-modal="true", so focus must actually move into it
  // when it opens and return to the trigger when it closes. Without this, a
  // keyboard user stayed focused behind the overlay and Tab could reach the
  // page underneath — the modal contract was claimed but not honoured.
  useEffect(() => {
    if (open) {
      hasOpenedRef.current = true;
      closeButtonRef.current?.focus();
      return;
    }
    // Only restore focus if the drawer has actually been open, so this does not
    // steal focus on first mount.
    if (hasOpenedRef.current) {
      triggerRef.current?.focus();
    }
  }, [open]);

  // Close the drawer when the viewport grows past the xl breakpoint.
  // The drawer is hidden by CSS at xl, but `open` must not retain the body
  // scroll lock when a tablet viewport is resized into the desktop layout.
  // A resize listener works under both real browser and CDP viewport emulation.
  useEffect(() => {
    const XL_MIN_WIDTH = 1280;
    const onResize = () => {
      if (window.innerWidth >= XL_MIN_WIDTH) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const desktopNav = (
    <div className="hidden xl:flex items-center gap-3">
      {isHome && (
        <details className="relative">
          <summary
            aria-controls="desktop-home-sections"
            className="flex min-h-[44px] cursor-pointer list-none items-center gap-1 px-2 text-xs font-medium uppercase tracking-wide text-cream/90 transition-colors hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
          >
            Sections
            <ChevronDown aria-hidden="true" size={14} />
          </summary>
          <nav
            id="desktop-home-sections"
            aria-label="Home sections"
            className="glass-surface absolute left-0 top-full z-[70] mt-2 max-h-[min(70vh,32rem)] w-64 overflow-y-auto rounded-lg p-2"
          >
            {HOME_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={activeSection === section.id ? "location" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  event.currentTarget.closest("details")?.removeAttribute("open");
                  goToSection(section.id);
                }}
                className={cn(
                  "flex min-h-[44px] items-center rounded-md px-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light",
                  activeSection === section.id
                    ? "text-gold-light"
                    : "text-cream/90 hover:bg-glass-surface-subtle hover:text-gold-light"
                )}
              >
                {section.label}
              </a>
            ))}
          </nav>
        </details>
      )}

      <nav aria-label="Pages" className="flex items-center gap-0.5">
        {PAGE_LINKS.map((page) => {
          const pageKey = page.path.slice(1);
          const isActive = currentPage === pageKey;
          return (
            <Link
              key={page.path}
              to={page.path}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex min-h-[44px] items-center px-2 text-xs font-medium uppercase tracking-wide transition-colors",
                isActive ? "text-gold-light" : "text-cream/80 hover:text-gold-light"
              )}
            >
              {page.label}
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gold-light" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  const mobileNav = (
    <button
      ref={triggerRef}
      className="xl:hidden flex items-center justify-center min-w-[44px] min-h-[44px] -mr-2 text-cream rounded-lg transition-all duration-200 active:scale-95 active:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
      onClick={() => setOpen((o) => !o)}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobileNavLinks"
    >
      {open ? <X size={24} /> : <Menu size={24} />}
    </button>
  );

  const mobileMenu = open && (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[60] bg-green-deep/95 backdrop-blur-md xl:hidden"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Close button inside drawer */}
      <button
        ref={closeButtonRef}
        className="absolute top-4 right-4 flex items-center justify-center min-w-[44px] min-h-[44px] text-cream/70 hover:text-cream rounded-lg transition-all duration-200 active:scale-95 active:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
        onClick={() => setOpen(false)}
        aria-label="Close navigation menu"
      >
        <X size={24} />
      </button>

      <div
        id="mobileNavLinks"
        className={cn(
          "flex flex-col h-full items-center justify-start gap-4 text-center px-6 pt-20 overflow-y-auto",
          !reducedMotion && "mobile-drawer"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {isHome && (
          <>
            <div className="text-cream/75 text-sm font-semibold tracking-[0.25em] uppercase mb-1">
              Home
            </div>
            <div className="flex flex-col items-center gap-1">
              {HOME_SECTIONS.map((section) => (
                <Link
                  key={section.id}
                  to={`#${section.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    goToSection(section.id);
                    setOpen(false);
                  }}
                  className="font-display font-medium text-xl tracking-wide text-cream hover:text-gold-light transition-colors duration-200 no-underline min-h-[44px] flex items-center px-4 rounded-lg active:bg-white/10 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
                >
                  {section.label}
                </Link>
              ))}
            </div>
            <div className="w-32 h-px bg-white/30 my-3" aria-hidden="true" />
          </>
        )}

        <div className="text-cream/75 text-sm font-semibold tracking-[0.25em] uppercase mb-1">
          Pages
        </div>
        <div className="flex flex-col items-center gap-1">
          {PAGE_LINKS.map((page) => {
            const pageKey = page.path.slice(1);
            const isActive = currentPage === pageKey;
            return (
              <Link
                key={page.path}
                to={page.path}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "font-display font-medium text-xl tracking-wide transition-colors duration-200 min-h-[44px] flex items-center px-4 rounded-lg active:bg-white/10 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light",
                  isActive ? "text-gold-light" : "text-cream hover:text-gold-light"
                )}
              >
                {page.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 z-50 w-full transition-colors duration-300",
          "glass-nav"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="flex items-center gap-3 group min-h-[44px]"
            aria-label="AATMA home"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-9 h-9 md:w-10 md:h-10 flex-shrink-0"
              aria-hidden
            >
              <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--color-green-deep)" strokeWidth="0.75" />
              <g fill="var(--color-gold)">
                <circle cx="50" cy="18" r="2" />
                <circle cx="50" cy="42" r="2" />
                <circle cx="50" cy="58" r="2" />
                <circle cx="50" cy="82" r="2" />
                <circle cx="82" cy="50" r="2" />
                <circle cx="18" cy="50" r="2" />
                <circle cx="69" cy="31" r="2" />
                <circle cx="31" cy="31" r="2" />
                <circle cx="69" cy="69" r="2" />
                <circle cx="31" cy="69" r="2" />
              </g>
              <circle cx="50" cy="38" r="4.5" fill="var(--color-gold)" />
              <g stroke="var(--color-gold)" strokeWidth="1" fill="none">
                <path d="M50 42 L50 38 M50 38 L50 34 M50 34 Q60 30 72 38" />
                <path d="M50 42 L50 38 M50 38 L50 34 M50 34 Q40 30 28 38" />
              </g>
              <path d="M33 72 Q50 60 67 72 L64 79 Q50 72 36 79 Z" fill="var(--color-gold)" />
            </svg>
            <span
              className={cn(
                "font-display text-sm md:text-base font-semibold tracking-tight transition-colors duration-300",
                onHome ? "text-white drop-shadow" : "text-gold-light"
              )}
            >
              {AATMA.shortName}
            </span>
          </Link>

          {desktopNav}
          {mobileNav}
        </div>
      </nav>

      {mobileMenu}
    </>
  );
}

export default Navbar;
