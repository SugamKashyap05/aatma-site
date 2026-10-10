import { Link, useLocation, useNavigate } from "react-router-dom";
import { AATMA } from "@/data/content";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollY } from "@/hooks/useScrollY";
import { useCurrentRoute } from "@/hooks/useCurrentRoute";

const HOME_SECTIONS = [
  { id: "about", label: "About" },
  { id: "agar-story", label: "Agar Story" },
  { id: "milestones", label: "Milestones" },
  { id: "members", label: "Members" },
  { id: "press", label: "Press & Media" },
  { id: "contact", label: "Contact" },
] as const;

const PAGE_LINKS = [
  { path: "/books", label: "Books" },
  { path: "/press", label: "Press" },
  { path: "/history", label: "History" },
  { path: "/policy", label: "Policy" },
  { path: "/research", label: "Research" },
] as const;

const SECTION_IDS = HOME_SECTIONS.map((s) => s.id);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection(SECTION_IDS);
  const currentPage = useCurrentRoute();

  const isHome = location.pathname === "/" || location.pathname === "/aatma-site/";
  const scrollY = useScrollY();
  const onHome = isHome && scrollY < 60 && !location.hash;

  const goToSection = (sectionId: string) => {
    if (isHome) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
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

  const desktopNav = (
    <div className="hidden md:flex items-center gap-6">
      <nav aria-label="Home sections" className="flex items-center gap-1">
        {HOME_SECTIONS.map((section) => {
          const isActive = isHome && activeSection === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(event) => {
                event.preventDefault();
                goToSection(section.id);
              }}
              className={cn(
                "relative font-sans text-xs font-medium tracking-wide uppercase transition-colors duration-300 px-2 py-1 no-underline",
                isActive
                  ? "text-gold"
                  : onHome
                  ? "text-white/80 hover:text-gold"
                  : "text-white/70 hover:text-gold"
              )}
            >
              {section.label}
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gold rounded-full" />
              )}
            </a>
          );
        })}
      </nav>

      <div className="w-px h-5 bg-white/20" aria-hidden="true" />

      <nav aria-label="Pages" className="flex items-center gap-1">
        {PAGE_LINKS.map((page) => {
          const pageKey = page.path.slice(1);
          const isActive = currentPage === pageKey;
          return (
            <Link
              key={page.path}
              to={page.path}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative font-sans text-xs font-medium tracking-wide uppercase transition-colors duration-300 px-2 py-1",
                isActive
                  ? "text-gold"
                  : "text-white/70 hover:text-gold"
              )}
            >
              {page.label}
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gold rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  const mobileNav = (
    <button
      className="md:hidden text-white p-2"
      onClick={() => setOpen((o) => !o)}
      aria-label="Toggle menu"
      aria-expanded={open}
      aria-controls="mobileNavLinks"
    >
      {open ? <X size={22} /> : <Menu size={22} />}
    </button>
  );

  const mobileMenu = open && (
    <div
      className="fixed inset-0 z-40 bg-green-deep/95 backdrop-blur-md md:hidden"
      onClick={() => setOpen(false)}
    >
      <div
        id="mobileNavLinks"
        className="flex flex-col h-full items-center justify-center gap-5 text-center px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-white/40 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
          Home
        </div>
        {HOME_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(event) => {
              event.preventDefault();
              goToSection(section.id);
              setOpen(false);
            }}
            className="font-display font-medium text-xl tracking-wide text-white hover:text-gold transition-colors duration-300 no-underline"
          >
            {section.label}
          </a>
        ))}

        <div className="w-16 h-px bg-white/20 my-2" />

        <div className="text-white/40 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
          Pages
        </div>
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
                "font-display font-medium text-xl tracking-wide transition-colors duration-300",
                isActive ? "text-gold" : "text-white hover:text-gold"
              )}
            >
              {page.label}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 z-50 w-full transition-colors duration-300",
          "bg-green-deep/80 backdrop-blur-md shadow-lg"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="flex items-center gap-3 group"
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
                onHome ? "text-white drop-shadow" : "text-gold"
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
