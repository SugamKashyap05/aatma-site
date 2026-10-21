import type { ReactNode } from "react";
import { cn, type ClassValue } from "@/lib/utils";
import { AmbientMotion } from "@/features/ambient/AmbientMotion";
import { Reveal } from "@/components/ui/reveal";
import { Footer } from "@/features/footer/Footer";
import { ImmersiveNavbar } from "@/components/ui/ImmersiveNavbar";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { useDevice } from "@/context/DeviceContext";

interface PageLayoutProps {
  /** Badge label shown above the heading (e.g. "Press & Media") */
  badge: string;
  /** Lucide icon rendered inside the badge pill */
  badgeIcon?: ReactNode;
  /** Page heading — can include JSX for gold-highlighted spans */
  title: ReactNode;
  /** Subheading paragraph below the title */
  subtitle?: string;
  /** Page body content */
  children: ReactNode;
  /** Extra classes on the outer wrapper */
  className?: ClassValue;
  /** Hero bottom padding (default "pb-8") */
  heroPaddingBottom?: string;
}

/**
 * Shared page layout wrapper for all non-home routes.
 * Provides consistent header, hero section with ambient motion,
 * and footer — all branded with green-deep / gold / cream tokens.
 */
export function PageLayout({
  badge,
  badgeIcon,
  title,
  subtitle,
  children,
  className,
  heroPaddingBottom = "pb-8",
}: PageLayoutProps) {
  const { tier } = useDevice();
  const isMobile = tier === "mobile";

  return (
    <div className={cn("relative min-h-screen", className)}>
      <VideoBackground />
      <ImmersiveNavbar />

      {/*
        `relative` with NO z-index: this puts <main> in the same paint layer as
        the fixed VideoBackground (z-0) but later in DOM order, so the page body
        paints above the background's glass layer. Without it the background — a
        full-viewport fixed layer carrying backdrop-filter: blur(12px) — paints
        over the static content and the sections read as blank.

        Deliberately no z-index here: any z-index would create a stacking
        context and trap descendants. The document preview modal is z-[9999]
        and must stay above the z-[70] navbar.
      */}
      <main id="main-content" tabIndex={-1} className="relative">
        {/* Hero section */}
        <section className={cn("relative pt-20 md:pt-28 overflow-hidden", heroPaddingBottom)}>
          <div aria-hidden="true" className="absolute inset-0 bg-green-deep" />
          <AmbientMotion
            variant={isMobile ? "fog" : "clouds"}
            theme="light"
            layers={isMobile ? 1 : 2}
            speed={isMobile ? 60 : 50}
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.08)_0%,rgba(0,0,0,0)_55%)] pointer-events-none"
            aria-hidden="true"
          />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <Reveal variant="fade" delay={0}>
              <span className="glass-surface-subtle inline-flex items-center gap-2 text-gold-light text-sm font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-sm mb-4">
                {badgeIcon}
                {badge}
              </span>
            </Reveal>
            <Reveal variant="up" delay={100}>
              <h1 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-tight mb-4">
                {title}
              </h1>
            </Reveal>
            {subtitle && (
              <Reveal variant="fade" delay={200}>
                <p className="text-white/80 text-base md:text-lg max-w-2xl">{subtitle}</p>
              </Reveal>
            )}
          </div>
        </section>

        {/* Page body */}
        {children}
      </main>

      <Footer deviceTier={tier} />
    </div>
  );
}

export default PageLayout;
