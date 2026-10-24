import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { assetUrl, cn } from "@/lib/utils";
import { useDevice } from "@/context/DeviceContext";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TimelineEvent {
  /**
   * Optional. A few entries (Hojai, Naharani distillation) have no date in any
   * client document; they render without a date chip rather than showing a
   * "date not stated" placeholder — removed at the client's request (2026-10-25).
   */
  year?: string;
  title: string;
  description: string;
  era: string;
  image?: string;
  /** Alt text for `image`; falls back to the title when absent. */
  imageAlt?: string;
  link?: string;
}

export interface Era {
  id: string;
  label: string;
  range: string;
}

// ─── Default Eras ────────────────────────────────────────────────────────────

export const DEFAULT_ERAS: Era[] = [
  { id: "ancient", label: "Ancient Roots", range: "pre-1905" },
  { id: "early-trade", label: "Early Trade", range: "1905–1975" },
  { id: "formation", label: "AATMA Formation", range: "1976" },
  { id: "growth", label: "Growth", range: "1977–1999" },
  { id: "critical", label: "Critical Era", range: "2000–2022" },
  { id: "modern", label: "Modern", range: "2023–2026" },
];

// ─── Default Events (client-supplied source documents) ───────────────────────
// Current claim decisions are tracked in docs/PHASE1_CANONICAL_CLAIM_LEDGER.md.
// Events removed during ledger audit (2026-10-17):
//   - "2001 Fresh Representation" — not in any client source
//   - "2005–2016 Continued Efforts" — vague filler, not in ledger
//   - "2023 Assam Agarwood Promotion Policy" — only in team-authored [50YRS]
//   - "2024 CITES Export Quota Secured" — exclude (no client source)
//   - "2025 First Legal Agarwood Export" — exclude (no client source)
//   - "2026 Export Promotion Cell Constituted" — exclude (no client source)
// Date corrections:
//   - "Dec 2003" → "6–7 Jan 2004" (workshop held Jan 2004, requested Dec 2003)
//   - "2017" → "24.8.2016" (delegation meeting was 24 Aug 2016 per [HIST] p.4)
//   - Hojai distillation is undated; the client source says "Meanwhile," not "Following years."
// Privacy: full member names removed per client instruction (ledger C3).
// Events restored from the final brief on 2026-10-24: the Ancient Roots sanchi
// paat record, Naharani/upper Assam distillation, the late-60s NEFA & Bhutan
// mahal leases, the 2007 North East Aromatics writ petition, the 2010
// escalation, the 20 Dec 2011 MoEF meeting, and the 2005–2016 memorandums.
// Client direction (2026-10-25): drop every "Date not stated" label — undated
// entries (Hojai, Naharani) simply show no date chip, and the Far East
// discovery passage was removed from the timeline entirely; its full text
// remains in the Import era chapter, so nothing is lost.

export const DEFAULT_EVENTS: TimelineEvent[] = [
  {
    year: "Ancient",
    title: "Sanchi Paat — the scripture bark",
    description:
      "The agar tree, or Sanchi plant, is one of the precious gifts of nature and deeply associated with the culture of Assam and North Eastern India since ancient times. Its bark, sanchi paat, was used for writing scripture — the renown Vaishnab saints of Assam Srimanta Sankar Dev, Madhav Deb and Damudar Deb wrote on Sanchipat, and the people of upper Assam planted the Sanchi plant in their homesteads as part of ritual.",
    era: "ancient",
  },
  {
    year: "1905–06",
    title: "Sylhet Agar Oil Extraction",
    description:
      "Agar wood found abundantly in forests of North Eastern region; used by people of Sylhet (now Bangladesh) for extracting oil.",
    era: "early-trade",
  },
  {
    year: "Post-Independence",
    title: "Barpather Entrepreneurs",
    description:
      "Certain entrepreneurs of Barpather started agarwood business in their homesteads, collecting raw agarwood from the forest mahals of Karbi Angong and Naga Hills.",
    era: "early-trade",
  },
  {
    title: "Hojai Distillation",
    description:
      "Meanwhile, several enthusiastic and visionary people of the Hojai area entered the trade and started small-scale distillation at Hojai.",
    era: "early-trade",
  },
  {
    title: "Naharani & upper Assam distillation",
    description:
      "A few years later, the agar trade and distillery business also began in Naharani and other parts of Jorhat and Sibsagar districts of upper Assam, utilizing agar wood harvested from the homegrown trees of their own homesteads.",
    era: "early-trade",
  },
  {
    year: "Late 1960s – 1970",
    title: "NEFA & Bhutan mahal leases",
    description:
      "In the late 60s, a group of enthusiastic people of Hojai took leases of agar mahals in NEFA and Bhutan, collected agar from there and brought it to Hojai. The Govt. of Assam used to lease agarwood mahals for a fixed period, which continued till 1970 — by which time the agar trade had developed as a cottage industry in the unorganized sector.",
    era: "early-trade",
  },
  {
    year: "1970–1980s",
    title: "Manipur Supply",
    description:
      "Entrepreneurs of Hojai and Silchar collected agarwood from the mahaldars of Manipur State under Forest Transit Pass, then processed and distilled it for oil at Hojai and Silchar. The products were subsequently taken to Bombay (Mumbai) under Lieu T.P. issued by the Forest Deptt. of Assam for sale.",
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
    title: "Trade Standstill",
    description:
      "For a short while from 1970 to 1980, Assam's agar trade survived on agar from Manipur. It came to a standstill in 1982.",
    era: "growth",
  },
  {
    year: "2000",
    title: "AATMA Re-organisation",
    description:
      "AATMA was re-organised in a General Meeting at Hojai.",
    era: "critical",
  },
  {
    year: "22–23 Nov 2000",
    title: "National Seminar at Guwahati",
    description:
      "AATMA's seminar on Scope & Dimension of Agar (Aquilaria spp.) Plantation in the North Eastern Region was held at the Assam Administrative Staff College, Khanapara, Guwahati.",
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
    year: "6–7 Jan 2004",
    title: "Workshop at Rabindra Bhavan",
    description:
      "AATMA sponsored and participated in 'The Workshop on Agar Plantation and Rule of Joint Forest Management Committees of Assam'.",
    era: "critical",
  },
  {
    year: "Oct 2005",
    title: "DFO Hojai Refusal",
    description:
      "The then DFO of Hojai denied verification of imported and re-exported consignments for CITES compliance. Around seven processing units suffered massive financial losses; several business houses shifted operations to neighboring states or overseas.",
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
    year: "2007",
    title: "North East Aromatics writ petition",
    description:
      "After the Govt. of Assam included agar wood processing units under the Assam Wood Based Industry Rule 2000, M/s North East Aromatics of Hojai — a prominent importing and exporting firm, with AATMA's backing — filed Writ Petition (W.P.(c) No. 6284/2007) in the Gauhati High Court against the State's Forest Department. The then Forest Minister personally urged the petitioners to withdraw on a firm assurance of amicable resolution; trusting the promise, they withdrew the legal proceeding.",
    era: "critical",
  },
  {
    year: "2010",
    title: "The trade targeted",
    description:
      "From 2010, the then Forest Minister issued strict instructions explicitly targeting the trade: alerts were coordinated across the Guwahati Airport authorities, the Assam Police, the Assam Forest Department and the Maharashtra Forest Department. Assam agar traders were detained even in hotels in Maharashtra, and agar dealers based in Mumbai were harassed, leading to numerous unlawful seizures of cultivated agar wood.",
    era: "critical",
  },
  {
    year: "20 Dec 2011",
    title: "MoEF meeting, New Delhi",
    description:
      "On official invitation, AATMA participated in the meeting on 'Conservation of Agarwood in India' convened by the Ministry of Environment and Forests at Paryavaran Bhawan, New Delhi, chaired by the Additional Director General (Wildlife). AATMA President Shri A. Rahman briefed the central authorities, who categorically clarified that regulating Assam's local wood-based units is strictly a State matter, not a Central restriction.",
    era: "critical",
  },
  {
    year: "2005–2016",
    title: "Two decades of memorandums",
    description:
      "Disheartened but persistent, AATMA's office bearers continued through 2005–2016 to meet successive Chief Ministers, Forest Ministers and forest department authorities, submitting memorandums to exclude the agar industry from the 2000 Rules and bring it under 'Secondary Wood Based Industry', as the Central High Power Committee had approved. The Assam Ministry never approved the recommendation in cabinet.",
    era: "critical",
  },
  {
    year: "24.8.2016",
    title: "Forest Minister's Interest",
    description:
      "The then Forest Minister took keen interest in agar industry. A proposal for inclusion of Agar wood industry in 'Secondary Wood Based Industry' was submitted.",
    era: "critical",
  },
  {
    year: "28.10.2016",
    title: "National Conference at NEDFi House",
    description:
      "The Assam Forest Department organized a National Conference on Agarwood & Oil Industries: Prospect & Possibilities.",
    era: "critical",
  },
  {
    year: "19.7.2021",
    title: "Delegation to Chief Minister",
    description:
      "An AATMA delegation met the Chief Minister of Assam and submitted a memorandum on the problems faced by agar industries over the previous 21 years.",
    era: "critical",
  },
  {
    year: "12 Jan 2023",
    title: "2022 Rules Enacted",
    description:
      "On 12 January 2023, the Government of Assam enacted the 'Assam Wood Based Industries (Promotion & Development) Rules, 2022'. Agar Wood Industries were declared Secondary Wood Based Industries, liberalizing the trade.",
    era: "modern",
  },
  {
    year: "14 Feb 2023",
    title: "Stakeholders Conference",
    description:
      "A Stakeholders Conference was organized to explain the Assam Wood Based Industries (Promotion & Development) Rules, 2022 and the Assam Trees Outside Forest (Sustainable Management) Rules, 2022 to relevant industry stakeholders, in the presence of the Environment & Forests Department, Government of Assam.",
    era: "modern",
  },
  {
    year: "26 Aug 2026",
    title: "AIDC Stakeholders’ Workshop",
    description:
      "AATMA participated in a one-day stakeholders’ workshop organized by the Assam Industrial Development Corporation Limited, in the presence of the Forest, Agriculture, and Industry Ministers. Discussions covered relaxations for the agarwood trade and industry.",
    era: "modern",
    image: assetUrl("events/aidc-workshop-2026-hall.jpg"),
    imageAlt:
      "The hall at the AIDC stakeholders' workshop, showing the stage and the event backdrop",
  },
];

// ─── Helper: group events by era ────────────────────────────────────────────

/**
 * Group events by era, preserving each event's index in the original array.
 *
 * The index is captured here rather than recovered later with
 * `events.indexOf(event)`: indexOf relies on object identity, so it silently
 * returns -1 for a structurally-equal-but-distinct object, and it is O(n) per
 * lookup. Carrying the index makes the lookup exact and constant-time.
 */
function groupEventsByEra(events: TimelineEvent[], eras: Era[]) {
  const grouped = new Map<string, { event: TimelineEvent; index: number }[]>();
  for (const era of eras) {
    grouped.set(era.id, []);
  }
  events.forEach((event, index) => {
    const list = grouped.get(event.era);
    if (list) {
      list.push({ event, index });
    }
  });
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

  // Build a flat list of items: era headers interleaved with events.
  // The event's own index is carried through from the grouping step, so the
  // desktop view and the mobile view agree on which event is which.
  const items: Array<{ type: "era"; era: Era } | { type: "event"; event: TimelineEvent; index: number }> = [];
  for (const era of eras) {
    const eraEvents = grouped.get(era.id) || [];
    if (eraEvents.length === 0) continue;
    items.push({ type: "era", era });
    for (const { event, index } of eraEvents) {
      items.push({ type: "event", event, index });
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
            ? "bg-gold/20 border border-gold/40 text-gold-light hover:bg-gold/30 active:bg-gold/30 cursor-pointer"
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
            ? "bg-gold/20 border border-gold/40 text-gold-light hover:bg-gold/30 active:bg-gold/30 cursor-pointer"
            : "bg-white/5 border border-white/10 text-white/20 cursor-not-allowed"
        )}
      >
        <ChevronRight size={20} />
      </button>

      {/* Timeline track.
          role="listbox" + role="option" is the correct pairing for a set of
          selectable items. The previous role="list" + role="listitem" made
          aria-selected invalid — it is not permitted on listitem, so assistive
          tech silently ignored it and the active event was never announced. */}
      <div
        ref={scrollRef}
        className="overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-12 py-8 snap-x snap-proximity"
        role="listbox"
        aria-label="Timeline of agar trade history"
      >
        <div className="flex items-start gap-0 min-w-max">
          {items.map((item) => {
            if (item.type === "era") {
              return (
                <div key={`era-${item.era.id}`} className="flex flex-col items-center shrink-0 mx-4">
                  <div
                    className="w-1 h-8 rounded-full mb-2 bg-agar-icon"
                  />
                  <span className="text-agar-label text-xs font-semibold tracking-wider uppercase whitespace-nowrap">
                    {item.era.label}
                  </span>
                  <span className="text-[10px] text-agar-body mt-0.5">{item.era.range}</span>
                </div>
              );
            }

            const { event, index } = item;
            const isActive = index === activeIndex;

            return (
              <button
                key={`event-${index}`}
                data-index={index}
                role="option"
                aria-selected={isActive}
                aria-label={event.year ? `${event.year}: ${event.title}` : event.title}
                onClick={() => onSelect(index)}
                className={cn(
                  "flex flex-col items-center shrink-0 mx-3 group cursor-pointer transition-all duration-300 snap-center",
                  isActive ? "scale-110" : "hover:scale-105"
                )}
              >
                {/* Dot */}
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 transition-all duration-300 mb-3",
                    isActive
                      ? "border-agar-icon bg-agar-icon shadow-lg shadow-gold/40"
                      : "border-white/30 bg-white/10 group-hover:border-agar-icon/60 group-active:border-agar-icon/60 group-hover:bg-agar-icon/20 group-active:bg-agar-icon/20"
                  )}
                />
                {/* Year — absent when the source states no date */}
                {event.year && (
                  <span
                    className={cn(
                      "text-sm font-bold tracking-tight transition-colors duration-300 mb-1",
                      isActive ? "text-agar-label" : "text-agar-label group-hover:text-agar-title group-active:text-agar-title"
                    )}
                  >
                    {event.year}
                  </span>
                )}
                {/* Title */}
                <span
                  className={cn(
                    "text-xs text-center max-w-[120px] leading-tight transition-colors duration-300",
                    isActive ? "text-agar-title" : "text-agar-body group-hover:text-agar-title group-active:text-agar-title"
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
          className="mt-6 mx-4 md:mx-12 bg-glass-card backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-lg"
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
                    <span className="text-agar-label text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border border-gold/20 bg-gold/10">
                      {era?.label || event.era}
                    </span>
                    {event.year && (
                      <span className="text-agar-label text-sm font-semibold">{event.year}</span>
                    )}
                  </div>
                  <h3 className="text-agar-title text-lg md:text-xl font-semibold mb-2 font-display">
                    {event.title}
                  </h3>
                  <p className="text-agar-body text-sm md:text-base leading-relaxed">
                    {event.description}
                  </p>
                </div>
                {event.image && (
                  <div className="w-full md:w-40 rounded-lg overflow-hidden shrink-0 border border-white/10">
                    <img
                      src={event.image}
                      alt={event.imageAlt ?? event.title}
                      className="w-full aspect-[3/4] object-cover"
                      loading="lazy"
                      decoding="async"
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
    <div className="relative pl-6" role="listbox" aria-label="Timeline of agar trade history">
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
                className="w-3 h-3 rounded-full -ml-6 border-2 border-green-deep bg-agar-icon"
              />
              <div>
                <span className="text-agar-label text-xs font-bold tracking-widest uppercase">
                  {era.label}
                </span>
                <span className="text-[10px] text-agar-body ml-2">{era.range}</span>
              </div>
            </div>

            {/* Events in this era */}
            {eraEvents.map(({ event, index: globalIndex }) => {
              const isActive = globalIndex === activeIndex;

              return (
                <button
                  key={globalIndex}
                  role="listitem"
                  aria-selected={isActive}
                  aria-label={event.year ? `${event.year}: ${event.title}` : event.title}
                  onClick={() => onSelect(globalIndex)}
                  className="w-full text-left pl-6 pb-6 relative group cursor-pointer transition-all duration-300"
                >
                  {/* Dot on the line */}
                  <div
                    className={cn(
                      "absolute left-[-13px] top-1 w-3 h-3 rounded-full border-2 border-green-deep bg-agar-icon transition-all duration-300",
                      isActive ? "scale-125" : "opacity-60 group-hover:scale-110 group-hover:opacity-100 group-active:scale-110 group-active:opacity-100"
                    )}
                  />

                  <div
                    className={cn(
                      "p-4 rounded-lg border transition-all duration-300",
                      isActive
                        ? "bg-green-deep border-gold/30"
                        : "bg-glass-card border-white/20 group-hover:border-gold/30 group-active:border-gold/30"
                    )}
                  >
                    {event.year && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-agar-label text-xs font-bold">{event.year}</span>
                      </div>
                    )}
                    <h4 className="text-agar-title text-sm font-semibold mb-1">{event.title}</h4>
                    <p className="text-agar-body text-xs leading-relaxed line-clamp-2">
                      {event.description}
                    </p>
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.imageAlt ?? event.title}
                        className="mt-3 w-32 aspect-[3/4] object-cover rounded-md border border-white/10"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
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

// ─── Read Mode — the whole timeline as a sequential list ─────────────────────

/**
 * Renders every event, grouped by era, as a plain readable list — the same
 * records as the interactive view, but with nothing hidden behind a click.
 * Requested by the client (2026-10-24) for readers who want the complete
 * record at once rather than one entry at a time.
 */
function ReadModeList({
  events,
  eras,
}: {
  events: TimelineEvent[];
  eras: Era[];
}) {
  const grouped = useMemo(() => groupEventsByEra(events, eras), [events, eras]);

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      {eras.map((era) => {
        const eraEvents = grouped.get(era.id) || [];
        if (eraEvents.length === 0) return null;

        return (
          <section key={era.id}>
            <div className="mb-4 flex items-baseline gap-3">
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.22em] text-gold-light">
                {era.label}
              </h3>
              <span className="text-[11px] text-agar-body">{era.range}</span>
            </div>
            <ol className="space-y-4 border-l border-white/15 pl-6">
              {eraEvents.map(({ event, index }) => (
                <li key={index} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[31px] top-4 w-2.5 h-2.5 rounded-full bg-agar-icon"
                  />
                  <div className="rounded-lg border border-white/15 bg-glass-card p-4 backdrop-blur-xl md:p-5">
                    <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                      {event.year && (
                        <span className="text-sm font-bold text-agar-label">
                          {event.year}
                        </span>
                      )}
                      <h4 className="font-semibold text-agar-title">
                        {event.title}
                      </h4>
                    </div>
                    <p className="text-sm leading-relaxed text-agar-body">
                      {event.description}
                    </p>
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.imageAlt ?? event.title}
                        className="mt-3 w-40 aspect-[3/4] rounded-md border border-white/10 object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
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
  const [rawActiveIndex, setActiveIndex] = useState(0);
  // Read mode: the full record as a sequential list, for readers who do not
  // want to step through entries one at a time.
  const [readMode, setReadMode] = useState(false);

  // Clamp during render rather than in an effect. `events` is a prop, so a
  // caller can swap in a shorter list and leave the selection pointing past the
  // end; deriving the clamped value here means the detail panel never indexes
  // out of bounds, without the extra render pass (and cascading-render warning)
  // that a setState-in-effect clamp would cause.
  const activeIndex = Math.min(rawActiveIndex, Math.max(0, events.length - 1));

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
            <div className="w-2.5 h-2.5 rounded-full bg-agar-icon" />
            <span className="text-[10px] text-agar-body tracking-wide uppercase">
              {era.label}
            </span>
          </div>
        ))}
      </div>

      {/* Read-mode toggle — the same records, readable end to end */}
      <div className="mb-6 flex justify-center">
        <button
          type="button"
          aria-pressed={readMode}
          data-timeline-read-mode
          onClick={() => setReadMode((current) => !current)}
          className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-gold/50 bg-glass-card px-5 py-2.5 text-sm font-semibold tracking-wide text-agar-label transition-colors hover:border-gold hover:bg-green-deep/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
        >
          <BookOpen size={16} aria-hidden="true" focusable="false" />
          {readMode ? "Interactive view" : "Read mode"}
        </button>
      </div>

      {readMode ? (
        <ReadModeList events={events} eras={eras} />
      ) : isMobile ? (
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
      {!readMode && (
        <p className="text-center text-agar-body text-[10px] mt-4">
          Use arrow keys to navigate, Home/End to jump to start/end
        </p>
      )}
    </div>
  );
}

export default InteractiveTimeline;
