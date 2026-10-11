import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { useDevice } from "@/context/DeviceContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  era: string;
  image?: string;
  link?: string;
}

export interface Era {
  id: string;
  label: string;
  range: string;
  color: string;
}

// ─── Default Eras ────────────────────────────────────────────────────────────

export const DEFAULT_ERAS: Era[] = [
  { id: "ancient", label: "Ancient Roots", range: "pre-1905", color: "#8B7355" },
  { id: "early-trade", label: "Early Trade", range: "1905–1975", color: "#C9A84C" },
  { id: "formation", label: "AATMA Formation", range: "1976", color: "#D4A843" },
  { id: "growth", label: "Growth", range: "1977–1999", color: "#B8944A" },
  { id: "critical", label: "Critical Era", range: "2000–2022", color: "#A67C3D" },
  { id: "modern", label: "Modern", range: "2023–2026", color: "#C9A84C" },
];

// ─── Default Events (from agar_brief.md) ────────────────────────────────────

export const DEFAULT_EVENTS: TimelineEvent[] = [
  {
    year: "1905–06",
    title: "Sylhet Agar Oil Extraction",
    description:
      "Agar wood found abundantly in forests of North Eastern region; used by people of Sylhet (now Bangladesh) for extracting oil.",
    era: "early-trade",
  },
  {
    year: "Post-1947",
    title: "Barpather Entrepreneurs",
    description:
      "Entrepreneurs of Barpather who were also Mahalders (Lessee) started agarwood business in their homestead, collecting raw agarwood from forest Mahals of Karbi Anglong and Nagaland.",
    era: "early-trade",
  },
  {
    year: "Late 1960s",
    title: "Hojai Distillation",
    description:
      "Enthusiastic and visionary people of Hojai area started distillation of agar oil. Key figures: (L) Hazi Mastafauddin Gaoburha, (L) Ajmal Ali, (L) Hazi Anfar Ali.",
    era: "early-trade",
  },
  {
    year: "1970–1980s",
    title: "Manipur Supply",
    description:
      "Entrepreneurs of Hojai collected Agarwood from Mahalders of Manipur State (under Forest Transit Pass); processed & distilled for oil at Hojai and Silchar.",
    era: "early-trade",
  },
  {
    year: "1976",
    title: "AATMA Formation",
    description:
      "ALL ASSAM AGAR TRADERS AND AGAR OIL MANUFACTURERS ASSOCIATION (AATMA) formed in 1976 with H.O. at Hojai. Duly registered vide 664 of 1978-79.",
    era: "formation",
  },
  {
    year: "1982",
    title: "New Dimension — Imports",
    description:
      "From 1970-1980, agar trade survived with Manipur supply, but stalled since 1982. Discovery of abundant agarwood in Far Eastern countries led to imports.",
    era: "growth",
  },
  {
    year: "2000",
    title: "Re-organisation & National Seminar",
    description:
      "AATMA re-organised in a General Meeting at Hojai. National seminar on Scope & Dimension of Agar plantation held at Administrative Staff College, Guwahati.",
    era: "critical",
  },
  {
    year: "2000",
    title: "Rules Framed",
    description:
      "Govt. of Assam framed Rules as 'Assam Wood Based Industries (Establishment and Regulation) Rules, 2000', creating uncertainty for growers and traders.",
    era: "critical",
  },
  {
    year: "26.06.2000",
    title: "Memorandum to Chief Minister",
    description:
      "AATMA met the then Chief Minister of Assam and submitted a Memorandum urging exclusion of agar oil extracting units from the purview of the 2000 Rules.",
    era: "critical",
  },
  {
    year: "2001",
    title: "Fresh Representation",
    description:
      "AATMA submitted fresh representation before Govt. of Assam urging exclusion of Agar oil extracting units from the Rules, 2000.",
    era: "critical",
  },
  {
    year: "Dec 2003",
    title: "Workshop at Rabindra Bhavan",
    description:
      "AATMA sponsored and participated in 'The Workshop on Agar Plantation and Rule of Joint Forest Management Committees of Assam'.",
    era: "critical",
  },
  {
    year: "Oct 2005",
    title: "DFO Hojai Refusal",
    description:
      "DFO denied verification of consignments for CITES compliance. ~6/7 processing units suffered huge losses; 7/8 business houses shifted to Meghalaya or abroad.",
    era: "critical",
  },
  {
    year: "01.03.2006",
    title: "Central Empowered Committee",
    description:
      "The Central Empowered Committee agreed to certain changes and recommended incorporating Agarwood industries in Secondary Wood Based Industry.",
    era: "critical",
  },
  {
    year: "2005–2016",
    title: "Continued Efforts",
    description:
      "Office bearers of AATMA continued to meet Chief Minister / Forest Minister and forest deptt authorities, submitting memoranda for excluding agar industry from Rules, 2000.",
    era: "critical",
  },
  {
    year: "2017",
    title: "Forest Minister's Interest",
    description:
      "The then Forest Minister, Smt Pramila Rani Brahma, took keen interest in agar industry. A proposal for inclusion of Agar wood industry in 'Secondary Wood Based Industry' was submitted.",
    era: "critical",
  },
  {
    year: "2022",
    title: "Resolution",
    description:
      "Govt made rules: 'Assam Wood Based Industries (Promotion & Development) Rules, 2022'. Agar Wood Industries declared as Secondary Wood Based Industries, liberalizing the trade.",
    era: "critical",
  },
  {
    year: "2023",
    title: "Assam Agarwood Promotion Policy",
    description:
      "The state legalises the entire agarwood trade chain — plantation, harvesting, processing, transit, and sale — bringing agar out of the ambit of forest produce regulations.",
    era: "modern",
  },
  {
    year: "2024",
    title: "CITES Export Quota Secured",
    description:
      "India secures a formal export quota: 1,51,080 kg/year of chips & powder and 7,050 kg/year of oil for 2024-2027.",
    era: "modern",
  },
  {
    year: "2025",
    title: "First Legal Agarwood Export",
    description:
      "Assam ships its first legally approved commercial consignment: 100 kg of premium agarwood chips to Saudi Arabia and 12 kg to the UAE.",
    era: "modern",
  },
  {
    year: "2026",
    title: "Export Promotion Cell Constituted",
    description:
      "In May 2026, the Ministry of Commerce constitutes a dedicated Agarwood Export Promotion Cell, bringing together CHEMEXCIL and SHEFEXIL.",
    era: "modern",
  },
];

// ─── Helper: group events by era ────────────────────────────────────────────

function groupEventsByEra(events: TimelineEvent[], eras: Era[]) {
  const grouped = new Map<string, TimelineEvent[]>();
  for (const era of eras) {
    grouped.set(era.id, []);
  }
  for (const event of events) {
    const list = grouped.get(event.era);
    if (list) {
      list.push(event);
    }
  }
  return grouped;
}

// ─── Desktop Horizontal Timeline ─────────────────────────────────────────────

function DesktopTimeline({
  events,
  eras,
  activeIndex,
  onSelect,
}: {
  events: TimelineEvent[];
  eras: Era[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const grouped = useMemo(() => groupEventsByEra(events, eras), [events, eras]);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  // Scroll active event into view
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeEl = el.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    if (activeEl) {
      const containerRect = el.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      const scrollLeft = activeRect.left - containerRect.left - containerRect.width / 2 + activeRect.width / 2;
      el.scrollTo({ left: el.scrollLeft + scrollLeft, behavior: "smooth" });
    }
  }, [activeIndex]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  // Build a flat list of items: era headers interleaved with events
  const items: Array<{ type: "era"; era: Era } | { type: "event"; event: TimelineEvent; index: number }> = [];
  let eventIndex = 0;
  for (const era of eras) {
    const eraEvents = grouped.get(era.id) || [];
    if (eraEvents.length === 0) continue;
    items.push({ type: "era", era });
    for (const event of eraEvents) {
      items.push({ type: "event", event, index: eventIndex });
      eventIndex++;
    }
  }

  return (
    <div className="relative">
      {/* Scroll buttons */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        aria-label="Scroll timeline left"
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
          canScrollLeft
            ? "bg-gold/20 border border-gold/40 text-gold hover:bg-gold/30 cursor-pointer"
            : "bg-white/5 border border-white/10 text-white/20 cursor-not-allowed"
        )}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        aria-label="Scroll timeline right"
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
          canScrollRight
            ? "bg-gold/20 border border-gold/40 text-gold hover:bg-gold/30 cursor-pointer"
            : "bg-white/5 border border-white/10 text-white/20 cursor-not-allowed"
        )}
      >
        <ChevronRight size={20} />
      </button>

      {/* Timeline track */}
      <div
        ref={scrollRef}
        className="overflow-x-auto no-scrollbar scroll-smooth px-12 py-8"
        role="list"
        aria-label="Timeline of agar trade history"
      >
        <div className="flex items-start gap-0 min-w-max">
          {items.map((item, i) => {
            if (item.type === "era") {
              return (
                <div key={`era-${item.era.id}`} className="flex flex-col items-center shrink-0 mx-4">
                  <div
                    className="w-1 h-8 rounded-full mb-2"
                    style={{ backgroundColor: item.era.color }}
                  />
                  <span
                    className="text-xs font-semibold tracking-wider uppercase whitespace-nowrap"
                    style={{ color: item.era.color }}
                  >
                    {item.era.label}
                  </span>
                  <span className="text-[10px] text-white/40 mt-0.5">{item.era.range}</span>
                </div>
              );
            }

            const { event, index } = item;
            const isActive = index === activeIndex;
            const era = eras.find((e) => e.id === event.era);
            const eraColor = era?.color || "#C9A84C";

            return (
              <button
                key={`event-${index}`}
                data-index={index}
                role="listitem"
                aria-selected={isActive}
                aria-label={`${event.year}: ${event.title}`}
                onClick={() => onSelect(index)}
                className={cn(
                  "flex flex-col items-center shrink-0 mx-3 group cursor-pointer transition-all duration-300",
                  isActive ? "scale-110" : "hover:scale-105"
                )}
              >
                {/* Dot */}
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 transition-all duration-300 mb-3",
                    isActive
                      ? "border-gold bg-gold shadow-lg shadow-gold/40"
                      : "border-white/30 bg-white/10 group-hover:border-gold/60 group-hover:bg-gold/20"
                  )}
                  style={isActive ? { borderColor: eraColor, backgroundColor: eraColor } : undefined}
                />
                {/* Year */}
                <span
                  className={cn(
                    "text-sm font-bold tracking-tight transition-colors duration-300 mb-1",
                    isActive ? "text-gold" : "text-white/50 group-hover:text-white/80"
                  )}
                >
                  {event.year}
                </span>
                {/* Title */}
                <span
                  className={cn(
                    "text-xs text-center max-w-[120px] leading-tight transition-colors duration-300",
                    isActive ? "text-white" : "text-white/40 group-hover:text-white/70"
                  )}
                >
                  {event.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active event detail card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="mt-6 mx-4 md:mx-12 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
          aria-live="polite"
        >
          {(() => {
            const event = events[activeIndex];
            if (!event) return null;
            const era = eras.find((e) => e.id === event.era);
            return (
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                      style={{
                        color: era?.color || "#C9A84C",
                        backgroundColor: `${era?.color || "#C9A84C"}20`,
                      }}
                    >
                      {era?.label || event.era}
                    </span>
                    <span className="text-gold text-sm font-semibold">{event.year}</span>
                  </div>
                  <h3 className="text-white text-lg md:text-xl font-semibold mb-2 font-display">
                    {event.title}
                  </h3>
                  <p className="text-white/65 text-sm md:text-base leading-relaxed">
                    {event.description}
                  </p>
                </div>
                {event.image && (
                  <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile Vertical Timeline ────────────────────────────────────────────────

function MobileTimeline({
  events,
  eras,
  activeIndex,
  onSelect,
}: {
  events: TimelineEvent[];
  eras: Era[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const grouped = useMemo(() => groupEventsByEra(events, eras), [events, eras]);

  return (
    <div className="relative pl-6" role="list" aria-label="Timeline of agar trade history">
      {/* Vertical line */}
      <div className="absolute left-[9px] top-0 bottom-0 w-px bg-white/10" />

      {eras.map((era) => {
        const eraEvents = grouped.get(era.id) || [];
        if (eraEvents.length === 0) return null;

        return (
          <div key={era.id} className="mb-8">
            {/* Era header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-3 h-3 rounded-full -ml-6 border-2 border-green-deep"
                style={{ backgroundColor: era.color }}
              />
              <div>
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: era.color }}
                >
                  {era.label}
                </span>
                <span className="text-[10px] text-white/40 ml-2">{era.range}</span>
              </div>
            </div>

            {/* Events in this era */}
            {eraEvents.map((event) => {
              const globalIndex = events.indexOf(event);
              const isActive = globalIndex === activeIndex;

              return (
                <button
                  key={globalIndex}
                  role="listitem"
                  aria-selected={isActive}
                  aria-label={`${event.year}: ${event.title}`}
                  onClick={() => onSelect(globalIndex)}
                  className={cn(
                    "w-full text-left pl-6 pb-6 relative group cursor-pointer transition-all duration-300",
                    isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                  )}
                >
                  {/* Dot on the line */}
                  <div
                    className={cn(
                      "absolute left-[-13px] top-1 w-3 h-3 rounded-full border-2 border-green-deep transition-all duration-300",
                      isActive ? "scale-125" : "group-hover:scale-110"
                    )}
                    style={{ backgroundColor: isActive ? era.color : `${era.color}60` }}
                  />

                  <div
                    className={cn(
                      "p-4 rounded-lg border transition-all duration-300",
                      isActive
                        ? "bg-white/10 border-gold/30"
                        : "bg-white/[0.03] border-white/10 group-hover:bg-white/[0.06]"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gold text-xs font-bold">{event.year}</span>
                    </div>
                    <h4 className="text-white text-sm font-semibold mb-1">{event.title}</h4>
                    <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export interface InteractiveTimelineProps {
  events?: TimelineEvent[];
  eras?: Era[];
  className?: string;
}

export function InteractiveTimeline({
  events = DEFAULT_EVENTS,
  eras = DEFAULT_ERAS,
  className,
}: InteractiveTimelineProps) {
  const { tier } = useDevice();
  const isMobile = tier === "mobile";
  const [activeIndex, setActiveIndex] = useState(0);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, events.length - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Home") {
        e.preventDefault();
        setActiveIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setActiveIndex(events.length - 1);
      }
    },
    [events.length]
  );

  return (
    <div
      className={cn("w-full", className)}
      role="region"
      aria-label="Interactive timeline of agar trade history"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Era legend */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {eras.map((era) => (
          <div key={era.id} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: era.color }}
            />
            <span className="text-[10px] text-white/50 tracking-wide uppercase">
              {era.label}
            </span>
          </div>
        ))}
      </div>

      {isMobile ? (
        <MobileTimeline
          events={events}
          eras={eras}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
      ) : (
        <DesktopTimeline
          events={events}
          eras={eras}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
      )}

      {/* Keyboard hint */}
      <p className="text-center text-white/30 text-[10px] mt-4">
        Use arrow keys to navigate, Home/End to jump to start/end
      </p>
    </div>
  );
}

export default InteractiveTimeline;
