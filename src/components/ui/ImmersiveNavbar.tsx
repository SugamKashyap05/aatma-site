import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useCurrentRoute } from "@/hooks/useCurrentRoute";
import { useScrollY } from "@/hooks/useScrollY";
import { NAV_HOME_SECTIONS, NAV_PAGE_LINKS } from "@/data/navigation";
import { routeUrl } from "@/components/ui/Navbar";

const HOME_SECTIONS = NAV_HOME_SECTIONS;
const PAGE_LINKS = NAV_PAGE_LINKS;
const SECTION_IDS = HOME_SECTIONS.map((s) => s.id);

const CLIPS = {
  bottom: {
    closedInitial: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    closedFinal: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  },
  top: {
    closedInitial: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    closedFinal: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  },
  left: {
    closedInitial: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    closedFinal: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
  },
  right: {
    closedInitial: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    closedFinal: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
  },
};

const REDUCED_MOTION_DURATION = 0.2;

function useFocusTrap(
  active: boolean,
  containerRef: React.RefObject<HTMLElement | null>,
  onEscape: () => void,
) {
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(focusableSelector),
    ).filter((el) => el.getClientRects().length > 0);

    if (focusable.length > 0) {
      focusable[0].focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscapeRef.current();
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === first || !container.contains(activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (activeElement === last || !container.contains(activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [active, containerRef]);
}

function NavLink({
  label,
  to,
  onClick,
  charStagger,
  reduced,
}: {
  label: string;
  to: string;
  onClick?: (event: React.MouseEvent) => void;
  charStagger: number;
  reduced: boolean;
}) {
  if (reduced) {
    return (
      <Link to={to} onClick={onClick}>
        {label}
      </Link>
    );
  }

  return (
    <Link to={to} onClick={onClick} className="group/link-hover font-display font-medium inline-block no-underline">
      <span className="sr-only">{label}</span>
      <span
        aria-hidden="true"
        className="font-display font-medium relative inline-block overflow-hidden align-middle leading-[1.08]"
      >
        {[...label].map((char, index) => (
          <span
            key={index}
            className="relative inline-block whitespace-pre transition-transform duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] group-hover/link-hover:-translate-y-[1.2em] group-focus-visible/link-hover:-translate-y-[1.2em]"
            style={{
              textShadow: "0 1.2em currentColor",
              transitionDelay: `${index * charStagger}s`,
            }}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </Link>
  );
}

export function ImmersiveNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const isAnimatingRef = useRef(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection(SECTION_IDS);
  const currentPage = useCurrentRoute();
  const scrollY = useScrollY();
  const reducedMotion = usePrefersReducedMotion();

  const isHome = location.pathname === "/" || location.pathname === "/aatma-site/";
  const onHome = isHome && scrollY < 60 && !location.hash;

  const { closedInitial, open: openClipPath, closedFinal } = CLIPS.bottom;

  // Handle hash-based navigation
  useEffect(() => {
    if (!isHome) return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const rafId = requestAnimationFrame(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(rafId);
  }, [location, isHome]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus trap
  useFocusTrap(isOpen, rootRef, () => setIsOpen(false));

  const onOpenMenu = () => {
    setIsOpen(true);
    timelineRef.current?.kill();
    gsap.set(overlayRef.current, { clipPath: closedInitial });

    if (reducedMotion) {
      gsap.set(overlayRef.current, { clipPath: openClipPath, autoAlpha: 0 });
      timelineRef.current = gsap.to(overlayRef.current, {
        autoAlpha: 1,
        duration: REDUCED_MOTION_DURATION,
        ease: "power2.out",
        onStart: () => { isAnimatingRef.current = true; },
        onComplete: () => { isAnimatingRef.current = false; },
      });
      return;
    }

    const timeline = gsap.timeline({
      onStart: () => { isAnimatingRef.current = true; },
      onComplete: () => { isAnimatingRef.current = false; },
    });
    timelineRef.current = timeline;
    timeline.to(overlayRef.current, {
      clipPath: openClipPath,
      duration: 1.2,
      delay: 0.2,
      ease: "power4.inOut",
    });

    // Animate content in
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.07, delay: 0.4 },
      );
    }
  };

  const onCloseMenu = () => {
    setIsOpen(false);
    timelineRef.current?.kill();

    if (reducedMotion) {
      timelineRef.current = gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: REDUCED_MOTION_DURATION,
        ease: "power2.out",
        onStart: () => { isAnimatingRef.current = true; },
        onComplete: () => {
          isAnimatingRef.current = false;
          gsap.set(overlayRef.current, { clipPath: closedFinal });
        },
      });
      return;
    }

    const timeline = gsap.timeline({
      onStart: () => { isAnimatingRef.current = true; },
      onComplete: () => { isAnimatingRef.current = false; },
    });
    timelineRef.current = timeline;
    timeline
      .to(contentRef.current?.children ?? [], {
        scale: 0.9,
        opacity: 0.5,
        duration: 0.7,
        ease: "power2.in",
      })
      .to(overlayRef.current, { clipPath: closedFinal, duration: 1.2, ease: "power4.inOut" }, "<");
  };

  const onToggleMenu = () => {
    if (isAnimatingRef.current) return;
    if (isOpen) onCloseMenu();
    else onOpenMenu();
  };

  const handleNavClick = (e: React.MouseEvent, to: string, sectionId?: string) => {
    e.preventDefault();
    onCloseMenu();
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 1500);
    } else {
      navigate(to);
    }
  };

  const navLinks = [
    ...(isHome
      ? HOME_SECTIONS.map((s) => ({
          label: s.label,
          to: `#${s.id}`,
          onClick: (e: React.MouseEvent) => handleNavClick(e, `#${s.id}`, s.id),
          active: activeSection === s.id,
        }))
      : []),
    ...PAGE_LINKS.map((p) => ({
      label: p.label,
      to: p.path,
      onClick: (e: React.MouseEvent) => handleNavClick(e, p.path),
      active: currentPage === p.path.slice(1),
    })),
  ];

  const socials = [
    { icon: InstagramIcon, href: "#", label: "Instagram" },
    { icon: FacebookIcon, href: "#", label: "Facebook" },
    { icon: TwitterIcon, href: "#", label: "Twitter" },
    { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  ];

  return (
    <div ref={rootRef}>
      {/* Fixed header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[70] flex h-16 md:h-20 items-center justify-between px-4 sm:px-8",
          "glass-nav transition-colors duration-300",
        )}
      >
        <Link
          to="/"
          className="flex items-center gap-3 min-h-[44px] group"
          aria-label="AATMA home"
        >
          <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-9 md:h-9 flex-shrink-0" aria-hidden>
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
              onHome ? "text-white drop-shadow" : "text-gold-light",
            )}
          >
            AATMA
          </span>
        </Link>

        <button
          ref={toggleButtonRef}
          onClick={onToggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="flex items-center justify-center min-w-[44px] min-h-[44px] text-cream hover:text-gold-light transition-colors rounded-lg active:scale-95 active:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
        >
          <div className="flex flex-col items-center gap-1.5">
            <span
              className={cn(
                "block h-0.5 w-6 transition-all duration-700 ease-in-out",
                isOpen ? "translate-y-1.75 rotate-45 bg-gold-light" : "bg-cream",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 transition-all duration-500",
                isOpen ? "scale-x-0 opacity-0" : "bg-cream",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 transition-all duration-700 ease-in-out",
                isOpen ? "-translate-y-2.25 -rotate-45 bg-gold-light" : "bg-cream",
              )}
            />
          </div>
        </button>
      </header>

      {/* Fullscreen overlay nav */}
      <nav
        ref={overlayRef}
        style={{ clipPath: closedInitial }}
        className={cn(
          "fixed inset-0 z-[60] flex flex-col",
          isOpen ? "pointer-events-auto" : "pointer-events-none",
          "bg-green-deep/80 backdrop-blur-xl",
        )}
        aria-hidden={!isOpen}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          ref={contentRef}
          className="flex min-h-0 flex-1 w-screen flex-col items-center justify-center gap-2 sm:gap-3 px-4 py-6 overflow-y-auto"
        >
          {/* Brand tagline */}
          <div className="hidden sm:flex flex-col items-center gap-1 text-center flex-shrink-0">
            <span className="text-gold-light text-[10px] font-medium uppercase tracking-[0.12em]">
              All Assam Agar Traders &amp; Agar Oil Manufacturers Association
            </span>
          </div>

          {/* Nav links */}
          <nav
            className="flex max-h-full flex-col items-center gap-0.5 sm:gap-1.5 w-full overflow-y-auto"
            aria-label="Site"
          >
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-none"
              >
                <NavLink
                  label={link.label}
                  to={link.to}
                  onClick={link.onClick}
                  charStagger={0.015}
                  reduced={reducedMotion}
                />
              </div>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-6 mt-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-cream/60 hover:text-gold-light transition-colors"
              >
                <social.icon />
              </a>
            ))}
          </div>

          {/* Location */}
          <span className="text-cream/50 text-sm">Hojai, Assam, India</span>
        </div>
      </nav>
    </div>
  );
}

export default ImmersiveNavbar;
