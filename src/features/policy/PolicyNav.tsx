import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollText, Building2, Scale, ClipboardCheck, Globe, AlertTriangle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subsection?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    id: "rules-wood-industries",
    label: "Wood Based Industries Rules 2022",
    icon: <Building2 className="w-4 h-4" />,
    subsection: "Section 1",
  },
  {
    id: "rules-trees-outside-forest",
    label: "Trees Outside Forest Rules 2022",
    icon: <Scale className="w-4 h-4" />,
    subsection: "Section 2",
  },
  {
    id: "comparison",
    label: "2000 vs 2022 Comparison",
    icon: <ScrollText className="w-4 h-4" />,
    subsection: "Section 3",
  },
  {
    id: "cites",
    label: "CITES Compliance",
    icon: <Globe className="w-4 h-4" />,
    subsection: "Section 4",
  },
  {
    id: "registration",
    label: "Registration Walkthrough",
    icon: <ClipboardCheck className="w-4 h-4" />,
    subsection: "Section 5",
  },
  {
    id: "platform",
    label: "Online Platform Guidance",
    icon: <Globe className="w-4 h-4" />,
    subsection: "Section 6",
  },
  {
    id: "gazette-citations",
    label: "Gazette Citations",
    icon: <ScrollText className="w-4 h-4" />,
    subsection: "Section 7",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * PolicyNav — sticky table-of-contents sidebar for the /policy page.
 * Highlights the active section as the user scrolls.
 */
export function PolicyNav() {
  const [activeId, setActiveId] = useState<string>("rules-wood-industries");

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
      aria-label="Policy page sections"
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
                <span className={cn(
                  "shrink-0",
                  activeId === item.id ? "text-gold" : "text-white/40"
                )}>
                  {item.icon}
                </span>
                <span className="leading-snug">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <AlertTriangle className="w-3 h-3" />
            <span>Source: 3 AATMA documents</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PolicyNav;
