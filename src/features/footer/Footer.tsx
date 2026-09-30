import { Mail, Phone, MapPin } from "lucide-react";
import { AATMA } from "@/data/content";
import { cn, type ClassValue } from "@/lib/utils";
import { AmbientMotion } from "@/features/ambient/AmbientMotion";

export function Footer({ className, deviceTier }: { className?: ClassValue; deviceTier?: "mobile" | "tablet" | "desktop" }) {
  const isMobile = deviceTier === "mobile";
  return (
    <footer className={cn("bg-green-deep text-white pt-12 pb-8 relative overflow-hidden", className)}>
      <AmbientMotion
        variant={isMobile ? "fog" : "fog"}
        theme="dark"
        layers={isMobile ? 1 : 2}
        speed={isMobile ? 75 : 60}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(201,168,76,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={cn(
          "grid gap-8 pb-10 border-b border-white/10",
          isMobile ? "flex flex-col" : "md:grid-cols-[1.2fr_1fr_1fr]"
        )}>
          {/* Brand block */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 100 100" className="w-9 h-9" aria-hidden="true" focusable="false">
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
              <span className="font-display text-base font-semibold text-gold">
                {AATMA.shortName}
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              A 50-year institution representing the agarwood trade and agaroil manufacturing sector of Assam since 1976.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="mailto:{AATMA.email}"
                className="text-white/50 hover:text-gold transition-colors duration-300"
                aria-label="Email AATMA"
              >
                <Mail size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Quick Links
            </div>
            <nav className="space-y-3">
              {["About AATMA", "Agar Story", "Milestones", "Members", "News", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="text-white/70 hover:text-gold text-sm transition-colors duration-300 block hover:underline underline-offset-4 decoration-white/20"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact + social */}
          <div>
            <div className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Contact
            </div>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${AATMA.phone.replace(/[^+\d]/g, "")}`}
                className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors duration-300"
              >
                <Phone size={15} strokeWidth={1.5} className="text-gold/60" />
                <span>{AATMA.phone}</span>
              </a>
              <a
                href={`mailto:${AATMA.email}`}
                className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors duration-300"
              >
                <Mail size={15} strokeWidth={1.5} className="text-gold/60" />
                <span>{AATMA.email}</span>
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <MapPin size={15} strokeWidth={1.5} className="text-gold/60 mt-0.5" />
                <span>Main Road, Hojai – 782435, Assam</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 text-white/50 text-xs">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} {AATMA.shortName}.</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>AATMA is a registered society under the Registrar of Societies, Assam.</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="text-white/40 hover:text-gold transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-white/40 hover:text-gold transition-colors duration-300"
              aria-label="X / Twitter"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Attribution note (small, honest) */}
        <div className="mt-6 text-center text-white/30 text-[11px] leading-relaxed max-w-2xl mx-auto">
          This website is a demonstration of design direction for {AATMA.shortName}. Names, dates, and figures drawn from public records are presented in good faith; office-bearer names, membership counts, and certain milestones remain to be confirmed with the association.
        </div>
      </div>
    </footer>
  );
}
