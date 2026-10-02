import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Chapter } from "@/data/books";

interface TableOfContentsProps {
  chapters: Chapter[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
  open: boolean;
}

export function TableOfContents({
  chapters,
  activeIndex,
  onSelect,
  onClose,
  open,
}: TableOfContentsProps) {
  if (!open) return null;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel — sidebar on desktop, drawer on mobile */}
      <aside
        className={cn(
          "fixed lg:sticky top-14 right-0 h-[calc(100vh-3.5rem)] w-72 lg:w-64",
          "border-l border-white/10 bg-green-deep/95 backdrop-blur-md overflow-y-auto z-50",
          "transform transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full lg:translate-x-0 lg:hidden"
        )}
        aria-label="Table of contents"
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-white">Contents</h3>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-gold transition-colors p-1 lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close table of contents"
            >
              <X size={18} />
            </button>
          </div>
          <nav className="space-y-1" role="navigation" aria-label="Chapter list">
            {chapters.map((ch, i) => (
              <button
                key={ch.id}
                onClick={() => onSelect(i)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-sm text-sm transition-colors min-h-[44px] flex items-center",
                  i === activeIndex
                    ? "bg-gold/20 text-gold font-medium"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
                aria-current={i === activeIndex ? "true" : undefined}
              >
                <span className="text-white/40 mr-2 text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {ch.title}
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
