import { Link, useLocation, useNavigate } from "react-router-dom";
import { AATMA } from "@/data/content";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SlideTabs from "@/components/ui/slide-tabs";

export function Navbar({ deviceTier }: { deviceTier?: "mobile" | "tablet" | "desktop" }) {
  const isMobile = deviceTier === "mobile";
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // React Router updates location on hash navigation (it uses the History API),
  // so location.hash reflects the current hash and causes re-renders automatically.
  const onHome =
    typeof window !== "undefined"
      ? window.scrollY < 60 && !location.hash
      : true;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 z-50 w-full transition-colors duration-300",
          onHome
            ? "bg-green-deep/80 backdrop-blur-md"
            : "bg-green-deep/80 backdrop-blur-md shadow-lg"
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
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="1.5"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="var(--color-green-deep)"
                strokeWidth="0.75"
              />
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
              <path
                d="M33 72 Q50 60 67 72 L64 79 Q50 72 36 79 Z"
                fill="var(--color-gold)"
              />
            </svg>
            <span
              className={cn(
                "font-display text-sm md:text-base font-semibold tracking-tight transition-colors duration-300",
                onHome
                  ? "text-white drop-shadow"
                  : "text-gold"
              )}
            >
              {AATMA.shortName}
            </span>
          </Link>

          <div id="navLinks" className={cn("hidden md:block", isMobile && "hidden")}>
            <SlideTabs
              tabs={["Home", "About", "Agar Story", "Milestones", "Members", "News", "Books", "Contact"]}
              onTabChange={(index) => {
                const routes = ["/", "#about", "#agar-story", "#milestones", "#members", "#news", "/books", "#contact"];
                const route = routes[index];
                if (route === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else if (route.startsWith("#")) {
                  window.location.hash = route;
                } else {
                  navigate(route);
                }
              }}
            />
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobileNavLinks"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-green-deep/80 backdrop-blur-md md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            id="mobileNavLinks"
            className="flex flex-col h-full items-center justify-center gap-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <NavLinkMobile to="/" label="Home" onHome={onHome} close={() => setOpen(false)} />
            <NavLinkMobile to="#about" label="About" onHome={onHome} close={() => setOpen(false)} />
            <NavLinkMobile to="#agar-story" label="Agar Story" onHome={onHome} close={() => setOpen(false)} />
            <NavLinkMobile to="#milestones" label="Milestones" onHome={onHome} close={() => setOpen(false)} />
            <NavLinkMobile to="#members" label="Members" onHome={onHome} close={() => setOpen(false)} />
            <NavLinkMobile to="#news" label="News" onHome={onHome} close={() => setOpen(false)} />
            <NavLinkMobile to="/books" label="Books" onHome={onHome} close={() => setOpen(false)} />
            <NavLinkMobile to="#contact" label="Contact" onHome={onHome} close={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

function NavLink({
  to,
  label,
  onHome,
  location,
}: {
  to: string;
  label: string;
  onHome: boolean;
  location: { hash: string };
}) {
  const active =
    to === "/"
      ? onHome
      : !onHome && location.hash === to;

  return (
    <Link
      to={to}
      className={cn(
        "relative font-sans text-sm font-medium tracking-wide uppercase transition-colors duration-300",
        active
          ? "text-gold"
          : onHome
          ? "text-white/80 hover:text-gold hover:underline underline-offset-8 decoration-white/30"
          : "text-white/70 hover:text-gold hover:underline underline-offset-8 decoration-white/30"
      )}
    >
      {label}
    </Link>
  );
}

function NavLinkMobile({
  to,
  label,
  onHome,
  close,
}: {
  to: string;
  label: string;
  onHome: boolean;
  close: () => void;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "font-display font-medium text-xl tracking-wide text-white hover:text-gold transition-colors duration-300",
        onHome ? "text-white" : "text-white/90"
      )}
      onClick={close}
    >
      {label}
    </Link>
  );
}
