import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AatmaLogo } from "@/components/ui/AatmaLogo";
import { routeUrl } from "@/components/ui/Navbar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { AATMA } from "@/data/content";
import { NAV_HOME_SECTIONS, NAV_PAGE_LINKS } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useCurrentRoute } from "@/hooks/useCurrentRoute";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SECTION_IDS = NAV_HOME_SECTIONS.map((section) => section.id);
const LINK_CLASS = "w-full";

export function ImmersiveNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection(SECTION_IDS);
  const currentPage = useCurrentRoute();
  const reducedMotion = usePrefersReducedMotion();

  const isHome = location.pathname === "/" || location.pathname === "/aatma-site/";

  useEffect(() => {
    if (!isHome || !location.hash) return;

    const sectionId = decodeURIComponent(location.hash.slice(1));
    let frameId = 0;
    let timeoutId = 0;
    const scrollToSection = () => {
      const target = document.getElementById(sectionId);
      if (!target) return false;

      observer.disconnect();
      window.clearTimeout(timeoutId);
      if (reducedMotion) {
        target.scrollIntoView({ behavior: "instant", block: "start" });
      } else {
        frameId = requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
      return true;
    };

    const observer = new MutationObserver(scrollToSection);
    observer.observe(document.body, { childList: true, subtree: true });
    if (!scrollToSection()) {
      timeoutId = window.setTimeout(() => observer.disconnect(), 5000);
    }

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [isHome, location.pathname, location.hash, reducedMotion]);

  const goToSection = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({
        behavior: reducedMotion ? "instant" : "smooth",
        block: "start",
      });
      return;
    }
    navigate(routeUrl(`/#${id}`));
  };

  const sectionLinks = NAV_HOME_SECTIONS.map((section) => (
    <NavigationMenuLink
      key={section.id}
      asChild
      active={activeSection === section.id}
      className={LINK_CLASS}
    >
      <a
        href={isHome ? `#${section.id}` : routeUrl(`/#${section.id}`)}
        aria-current={activeSection === section.id ? "location" : undefined}
        onClick={(event) => goToSection(event, section.id)}
      >
        {section.label}
      </a>
    </NavigationMenuLink>
  ));

  const pageLinks = NAV_PAGE_LINKS.map((page) => {
    const isActive = currentPage === page.path.slice(1);
    return (
      <NavigationMenuLink
        key={page.path}
        asChild
        active={isActive}
        className={LINK_CLASS}
      >
        <Link to={page.path} aria-current={isActive ? "page" : undefined}>
          {page.label}
        </Link>
      </NavigationMenuLink>
    );
  });

  return (
    <header className="fixed inset-x-0 top-0 z-[70] h-16 glass-nav">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="group flex min-h-11 items-center gap-2"
          aria-label="AATMA home"
        >
          <AatmaLogo alt="" className="h-9 w-8 shrink-0" loading="eager" />
          <span className="font-display text-sm font-semibold tracking-tight text-gold-light transition-colors group-hover:text-cream">
            {AATMA.shortName}
          </span>
        </Link>

        <NavigationMenu
          aria-label="Primary navigation"
          className="ml-auto max-w-none flex-none justify-end"
        >
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="px-2 text-xs sm:px-3 sm:text-sm">
                Sections
              </NavigationMenuTrigger>
              <NavigationMenuContent className="fixed inset-x-4 top-[4.375rem] mt-0 max-h-[calc(100dvh-5rem)] w-auto max-w-[34rem] overflow-y-auto md:absolute md:inset-x-auto md:right-0 md:top-full md:mt-4 md:w-[calc(100vw-2rem)]">
                <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
                  Home sections
                </p>
                <div className="grid grid-cols-2 gap-1">{sectionLinks}</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="px-2 text-xs sm:px-3 sm:text-sm">
                Pages
              </NavigationMenuTrigger>
              <NavigationMenuContent className="fixed inset-x-4 top-[4.375rem] mt-0 max-h-[calc(100dvh-5rem)] w-auto max-w-[24rem] overflow-y-auto md:absolute md:inset-x-auto md:right-0 md:top-full md:mt-4 md:w-[calc(100vw-2rem)]">
                <div className="grid grid-cols-2 gap-1">{pageLinks}</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}

export default ImmersiveNavbar;
