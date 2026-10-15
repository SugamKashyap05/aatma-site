import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Newspaper, ScrollText, BookOpen, FileCheck, Globe } from "lucide-react";
import { RESOURCE_CATEGORIES, type ResourceCategoryId } from "@/data/resources";

// ─── Icon Map ────────────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<ResourceCategoryId, typeof Newspaper> = {
  "press-notes": Newspaper,
  "policy-documents": ScrollText,
  "research-papers": BookOpen,
  "registration-forms": FileCheck,
  "cites-documentation": Globe,
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ResourceNav — sticky table-of-contents sidebar for the /resources page.
 * Highlights the active category as the user scrolls.
 */
export function ResourceNav() {
  const [activeId, setActiveId] = useState<string>(RESOURCE_CATEGORIES[0].id);

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

    RESOURCE_CATEGORIES.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Resource center sections"
      className="hidden lg:block sticky top-24 w-64 shrink-0"
    >
      <div className="border border-white/10 rounded-lg bg-white/[0.03] backdrop-blur-sm p-4">
        <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          On this page
        </p>
        <ul className="space-y-1">
          {RESOURCE_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id];
            const isActive = activeId === cat.id;
            return (
              <li key={cat.id}>
                <a
                  href={`#${cat.id}`}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-sm text-sm transition-all",
                    isActive
                      ? "bg-gold/10 text-gold border border-gold/20"
                      : "text-white/60 hover:text-white/90 hover:bg-white/5 border border-transparent"
                  )}
                >
                  <span
                    className={cn(
                      "shrink-0",
                      isActive ? "text-gold" : "text-white/40"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="leading-snug">{cat.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <BookOpen className="w-3 h-3" />
            <span>5 categories</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default ResourceNav;
