import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sprout, Users, Shield, Rocket, Handshake, BarChart3 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subsection: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    id: "rhizosphere-mycoflora",
    label: "Rhizosphere Mycoflora",
    icon: <Sprout className="w-4 h-4" />,
    subsection: "Section 1",
  },
  {
    id: "microbial-workforce",
    label: "Microbial Workforce",
    icon: <Users className="w-4 h-4" />,
    subsection: "Section 2",
  },
  {
    id: "biopesticide-potential",
    label: "Biopesticide Potential",
    icon: <Shield className="w-4 h-4" />,
    subsection: "Section 3",
  },
  {
    id: "pgpr-cultivation",
    label: "PGPR for Cultivation",
    icon: <Rocket className="w-4 h-4" />,
    subsection: "Section 4",
  },
  {
    id: "aau-partnership",
    label: "AAU Partnership",
    icon: <Handshake className="w-4 h-4" />,
    subsection: "Section 5",
  },
  {
    id: "data-visualization",
    label: "Data Visualization",
    icon: <BarChart3 className="w-4 h-4" />,
    subsection: "Section 6",
  },
  {
    id: "trade-data",
    label: "Trade Data",
    icon: <BarChart3 className="w-4 h-4" />,
    subsection: "Section 7",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ResearchNav — sticky table-of-contents sidebar for the /research page.
 * Highlights the active section as the user scrolls.
 */
export function ResearchNav() {
  const [activeId, setActiveId] = useState<string>("rhizosphere-mycoflora");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Research page sections"
      className="hidden lg:block sticky top-24 w-64 shrink-0"
    >
      <div className="border border-white/10 rounded-lg bg-white/[0.03] backdrop-blur-sm p-4">
        <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          On this page
        </p>
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-sm text-sm transition-all",
                  activeId === item.id
                    ? "bg-gold/10 text-gold border border-gold/20"
                    : "text-white/60 hover:text-white/90 hover:bg-white/5 border border-transparent"
                )}
              >
                <span
                  className={cn(
                    "shrink-0",
                    activeId === item.id ? "text-gold" : "text-white/40"
                  )}
                >
                  {item.icon}
                </span>
                <span className="leading-snug">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <Sprout className="w-3 h-3" />
            <span>Soil microbiome research</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default ResearchNav;
