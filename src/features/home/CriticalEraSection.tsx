import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn, type ClassValue } from "@/lib/utils";
import { Reveal, Stagger } from "@/components/ui/reveal";
import { CRITICAL_ERA_CARDS } from "@/data/critical-era";
import type { CriticalEraCard } from "@/data/critical-era";
import { CriticalEraDetailDialog } from "@/features/home/CriticalEraDetailDialog";

interface EraCardItemProps {
  card: CriticalEraCard;
  index: number;
  onSelect: (card: CriticalEraCard) => void;
}

function EraCardItem({ card, index, onSelect }: EraCardItemProps) {
  return (
    <Reveal variant="up" delay={index * 80} className="h-full">
      <button
        type="button"
        data-critical-era-trigger={card.id}
        aria-haspopup="dialog"
        aria-label={`Read more about ${card.title}, ${card.year}`}
        onClick={() => onSelect(card)}
        className="group relative flex h-full w-full flex-col rounded-xl border-t-4 border-gold bg-glass-card backdrop-blur-xl border-x-white/15 border-b-white/15 p-6 text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] active:-translate-y-1 active:shadow-[0_8px_32px_rgba(0,0,0,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold md:p-7"
      >
        <span className="mb-4 inline-block rounded-full bg-green-deep px-3 py-1 font-display text-sm font-bold tracking-wider text-agar-label">
          {card.year}
        </span>

        <h3 className="mb-3 font-display text-lg font-bold leading-snug text-agar-title">
          {card.title}
        </h3>

        <p className="text-sm leading-relaxed text-agar-body">{card.description}</p>

        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-agar-label">
          Read details
          <ArrowRight size={16} aria-hidden="true" focusable="false" />
        </span>
      </button>
    </Reveal>
  );
}

export function CriticalEraSection({ className }: { className?: ClassValue }) {
  const [selectedCard, setSelectedCard] = useState<CriticalEraCard | null>(null);
  const closeDialog = useCallback(() => setSelectedCard(null), []);

  return (
    <section
      id="critical-era"
      className={cn("relative overflow-hidden py-20 md:py-28 scroll-mt-20", className)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.06)_0%,rgba(0,0,0,0)_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal variant="fade" delay={0} className="mb-14 text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-agar-label">
            Critical Era · 2000–2016
          </span>
          <h2 className="mb-6 font-display text-3xl font-bold text-agar-title md:text-5xl">
            The Critical Era
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-agar-body md:text-lg">
            In the year 2000 the Govt. of Assam notified the Assam Wood Based
            Industries (Establishment and Regulation) Rules, 2000, classifying
            agar oil extracting units as wood based industries. These rules
            plunged Agar growers and traders into a period of deep
            uncertainties.
          </p>
        </Reveal>

        <Stagger staggerMs={100} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {CRITICAL_ERA_CARDS.map((card, index) => (
            <EraCardItem
              key={card.id}
              card={card}
              index={index}
              onSelect={setSelectedCard}
            />
          ))}
        </Stagger>

        <Reveal variant="up" delay={200} className="mt-12 text-center">
          <Link
            to="/history"
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-sm text-sm font-medium tracking-wide text-agar-label underline decoration-gold/40 underline-offset-4 transition-colors duration-300 hover:decoration-gold active:decoration-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Read the full story
            <span className="transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-active:translate-x-0">
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" focusable="false" />
            </span>
          </Link>
        </Reveal>
      </div>

      {selectedCard && (
        <CriticalEraDetailDialog card={selectedCard} onClose={closeDialog} />
      )}
    </section>
  );
}

export default CriticalEraSection;
