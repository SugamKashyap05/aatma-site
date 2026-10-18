import { cn } from "@/lib/utils";
import { RESOURCE_FILTERS, type ResourceDocType } from "@/data/resources";

interface ResourceFilterProps {
  active: ResourceDocType | "all";
  onChange: (next: ResourceDocType | "all") => void;
  /** Document count per filter id, keyed by filter id ("all" included). */
  counts: Record<string, number>;
}

/**
 * ResourceFilter — narrows the Resource Center to a single document type.
 *
 * Rendered as a group of toggle buttons (`aria-pressed`), so the control is
 * reachable and operable from the keyboard and announces its state.
 */
export function ResourceFilter({ active, onChange, counts }: ResourceFilterProps) {
  return (
    <div className="mb-10">
      <p
        id="resource-filter-label"
        className="text-gold-light text-xs font-semibold tracking-[0.2em] uppercase mb-3"
      >
        Filter by type
      </p>
      <div
        role="group"
        aria-labelledby="resource-filter-label"
        className="flex flex-wrap gap-2"
      >
        {RESOURCE_FILTERS.map((option) => {
          const isActive = active === option.id;
          const count = counts[option.id] ?? 0;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-sm border transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                isActive
                  ? "bg-gold/15 border-gold/40 text-gold-light"
                  : "bg-glass-surface-subtle border-glass-border text-cream/75 hover:text-white hover:border-glass-border-strong"
              )}
            >
              <span>{option.label}</span>
              <span
                className={cn(
                  "text-xs tabular-nums",
                  isActive ? "text-gold-light" : "text-white/65"
                )}
                aria-hidden="true"
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ResourceFilter;
