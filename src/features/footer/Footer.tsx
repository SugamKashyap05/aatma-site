import { Link } from "react-router-dom";
import { AATMA } from "@/data/content";
import { cn, type ClassValue } from "@/lib/utils";
import { AmbientMotion } from "@/features/ambient/AmbientMotion";
import { NAV_PAGE_LINKS, NAV_HOME_SECTIONS } from "@/data/navigation";
import { routeUrl } from "@/components/ui/Navbar";
import { AatmaLogo } from "@/components/ui/AatmaLogo";

/** Footer labels for the home-page section anchors (see src/data/navigation.ts). */
const HOME_SECTION_LINKS = NAV_HOME_SECTIONS.map((section) => ({
  id: section.id,
  label: section.label,
}));

/** Footer labels for the page routes. */
const PAGE_LINKS = NAV_PAGE_LINKS.map((page) => ({
  path: page.path,
  label: page.label,
}));

export function Footer({ className, deviceTier }: { className?: ClassValue; deviceTier?: "mobile" | "tablet" | "desktop" }) {
  const isMobile = deviceTier === "mobile";
  return (
    <footer className={cn("text-white pt-8 pb-6 relative overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={cn(
          "grid gap-6 pb-6 border-b border-white/10",
          isMobile ? "flex flex-col" : "md:grid-cols-[1.2fr_1fr_1fr]"
        )}>
          {/* Brand block */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <AatmaLogo alt="" className="h-12 w-10 flex-shrink-0" />
              <span className="font-display text-base font-semibold text-gold-light">
                {AATMA.shortName}
              </span>
            </div>
            <p className="text-cream/75 text-sm leading-relaxed max-w-xs">
              Association for the agarwood trade and agaroil manufacturing sector of Assam.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-gold-light text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Explore
            </div>
            <nav aria-label="Footer — pages" className="divide-y divide-white/10">
              {PAGE_LINKS.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="text-white/70 hover:text-gold-light active:text-gold-light text-sm transition-colors duration-300 block hover:underline active:underline underline-offset-4 decoration-white/20 min-h-[36px] flex items-center py-1.5"
                >
                  {page.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Home sections — the in-page anchors, grouped separately from the
              page routes above. The old list here was a copy of the home
              section list, and `Press` pointed at `/#press`, i.e. the home
              page's own teaser rather than the `/press` archive — which
              contradicts the Press-vs-News distinction the site states on both
              of those routes. A hash target only resolves when we are already
              on the home page, so it is built with `routeUrl`. */}
          <div>
            <div className="text-gold-light text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              On the home page
            </div>
            <nav aria-label="Footer — home sections" className="divide-y divide-white/10">
              {HOME_SECTION_LINKS.map((link) => (
                <Link
                  key={link.id}
                  to={routeUrl(`/#${link.id}`)}
                  className="text-white/70 hover:text-gold-light active:text-gold-light text-sm transition-colors duration-300 block hover:underline active:underline underline-offset-4 decoration-white/20 min-h-[36px] flex items-center py-1.5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 text-cream/75 text-xs">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} {AATMA.shortName}.</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>AATMA is a registered society under the Registrar of Societies, Assam.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
