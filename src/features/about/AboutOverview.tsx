import { useCallback, useState } from "react";
import { ArrowDown, ArrowRight, ChevronRight } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { AboutStoryDialog } from "@/features/about/AboutStoryDialog";
import { AmbientMotion } from "@/features/ambient/AmbientMotion";
import { ABOUT_INTRO_COPY } from "@/data/about-copy";
import { ABOUT_STORY_ITEMS, type AboutStoryItem } from "@/data/about-stories";
import { cn, type ClassValue } from "@/lib/utils";

interface AboutProps {
  className?: ClassValue;
  deviceTier?: "mobile" | "tablet" | "desktop";
}

export function AboutOverview({ className, deviceTier }: AboutProps) {
  const [language, setLanguage] = useState<"en" | "as">("en");
  const [expanded, setExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeDialog = useCallback(() => setSelectedIndex(null), []);
  const isMobile = deviceTier === "mobile";
  const selectedItem: AboutStoryItem | null =
    selectedIndex === null ? null : ABOUT_STORY_ITEMS[selectedIndex] ?? null;

  return (
    <section
      id="about"
      className={cn(
        "relative min-h-screen overflow-hidden scroll-mt-20 pb-16 pt-20 text-agar-body md:pb-24",
        className,
      )}
    >
      <AmbientMotion
        variant="fog"
        theme="green"
        layers={isMobile ? 1 : 2}
        speed={isMobile ? 60 : undefined}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.45))]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <Reveal variant="fade" delay={0}>
          <header className="mx-auto mb-10 flex max-w-5xl items-center justify-center gap-6 text-center md:mb-12 md:justify-start md:text-left">
            <div className="hidden shrink-0 md:block">
              <SealCard />
            </div>
            <div>
              <span className="mb-4 inline-block rounded-sm border border-white/20 bg-glass-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-agar-label backdrop-blur-xl md:text-sm">
                About AATMA · Est. 1976
              </span>
              <h2 className="font-display text-3xl font-bold leading-tight text-agar-title drop-shadow-lg sm:text-4xl md:text-5xl">
                From agar heritage to collective action
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-agar-body md:mx-0 md:text-base">
                Explore the cultural context, AATMA’s formation, advocacy, and the
                milestones recorded in the association’s brief.
              </p>
            </div>
          </header>
        </Reveal>

        <Reveal variant="up" delay={80} rootMargin="0px 0px 260px 0px">
          <div className="mx-auto mb-8 max-w-5xl rounded-sm border border-white/20 bg-glass-card p-6 shadow-lg backdrop-blur-xl md:mb-10 md:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-xl font-bold text-agar-title md:text-2xl">
                A precious gift of nature
              </h3>
              <button
                type="button"
                data-about-language-toggle
                onClick={() => setLanguage((current) => (current === "en" ? "as" : "en"))}
                className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-white/20 bg-green-deep/50 px-4 py-2 text-sm font-medium text-agar-label transition-colors hover:bg-green-deep/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
              >
                {language === "en" ? "অসমীয়াত পঢ়ক" : "Read in English"}
                <ChevronRight size={16} aria-hidden="true" focusable="false" />
              </button>
            </div>
            <div
              lang={language === "en" ? "en" : "as"}
              className={cn(
                "space-y-4 text-sm leading-relaxed text-agar-body md:text-base",
                language === "as" && "font-assamese",
              )}
            >
              {ABOUT_INTRO_COPY[language].map((paragraph, index) => (
                <p key={`${language}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="text-center">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="about-story-sequence"
            data-about-read-more
            onClick={() => setExpanded((current) => !current)}
            className="group inline-flex min-h-11 items-center gap-2 rounded-sm border border-gold/50 bg-glass-card px-5 py-2.5 text-sm font-semibold tracking-wide text-agar-label transition-colors hover:border-gold hover:bg-green-deep/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
          >
            {expanded ? "Show less" : "Read more"}
            <ArrowDown
              size={16}
              aria-hidden="true"
              focusable="false"
              className={cn(
                "transition-transform motion-reduce:transition-none",
                expanded && "rotate-180",
              )}
            />
          </button>
        </div>

        {expanded && (
          <div
            id="about-story-sequence"
            data-about-story-sequence
            className="mx-auto mt-10 max-w-4xl md:mt-12"
          >
            <ol className="relative space-y-4 before:absolute before:bottom-8 before:left-[1.35rem] before:top-8 before:w-px before:bg-gold/50 sm:space-y-5 sm:before:left-[1.55rem]">
              {ABOUT_STORY_ITEMS.map((item, index) => (
                <li key={item.id} className="relative pl-12 sm:pl-14">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-6 z-[1] flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-green-deep font-display text-xs font-bold text-agar-label sm:left-1 sm:h-12 sm:w-12"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    data-about-story-trigger={item.id}
                    data-paragraph-count={item.detailParagraphs.length}
                    aria-haspopup="dialog"
                    aria-label={`Open complete story ${index + 1} of ${ABOUT_STORY_ITEMS.length}: ${item.title}`}
                    onClick={() => setSelectedIndex(index)}
                    className="group flex min-h-[7rem] w-full flex-col rounded-sm border border-white/15 bg-glass-card p-5 text-left shadow-lg backdrop-blur-xl transition-colors hover:border-gold/50 hover:bg-green-deep/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none sm:p-6"
                  >
                    <span className="mb-2 text-xs font-semibold tracking-[0.16em] text-agar-label">
                      {item.eyebrow}
                    </span>
                    <span className="font-display text-base font-bold leading-snug text-agar-title sm:text-lg">
                      {item.title}
                    </span>
                    <span className="mt-2 text-sm leading-relaxed text-agar-body">
                      {item.description}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-agar-label">
                      Open full story
                      <ArrowRight size={16} aria-hidden="true" focusable="false" />
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {selectedItem && selectedIndex !== null && (
        <AboutStoryDialog
          item={selectedItem}
          index={selectedIndex}
          total={ABOUT_STORY_ITEMS.length}
          onClose={closeDialog}
          onPrevious={() => setSelectedIndex((current) => current === null ? null : Math.max(0, current - 1))}
          onNext={() => setSelectedIndex((current) => current === null ? null : Math.min(ABOUT_STORY_ITEMS.length - 1, current + 1))}
        />
      )}
    </section>
  );
}

function SealCard() {
  return (
    <div className="flex flex-col items-center gap-2" aria-label="AATMA seal, established 1976 in Hojai">
      <svg viewBox="0 0 100 100" className="h-20 w-20 lg:h-24 lg:w-24" aria-hidden="true" focusable="false">
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
      <span className="font-display text-[10px] leading-tight tracking-wide text-agar-label">
        AATMA · Hojai
      </span>
    </div>
  );
}

export default AboutOverview;
