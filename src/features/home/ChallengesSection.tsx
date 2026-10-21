import { cn, type ClassValue } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Stagger } from "@/components/ui/reveal";
import {
  Landmark,
  Building2,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";

/**
 * ChallengesSection — brief §10 "Ongoing Challenges & The Way Forward".
 *
 * Three challenges currently facing Assam's agarwood trade: license fees that
 * price out small traders, the single-window system AATMA advocates in place
 * of multi-layered bureaucracy, and the August 26, 2026 AIDC stakeholders'
 * workshop where the industry put its case to government.
 *
 * Each item carries a terracotta left border (the Assam visual-identity
 * accent introduced alongside this section) to set the tone apart from the
 * celebratory gold-bordered achievement sections above it.
 *
 * Source: the latest client brief, "A brief note on Agar Trade (2)" §10
 * ("Ongoing Challenges & The Way Forward"), carries the high-license-fee,
 * single-window and 26 August 2026 AIDC workshop wording directly. The
 * canonical Phase 1 ledger supersedes the old `exclude` row for the
 * NOC/30-working-day claim; that claim is not rendered here.
 */

interface Challenge {
  icon: LucideIcon;
  title: string;
  body: string;
}

const CHALLENGES: Challenge[] = [
  {
    icon: Landmark,
    title: "High License Fees",
    body: "Current license fees remain quite high for small-scale and general traders. A shorter, more efficient, and cost-effective licensing process is needed.",
  },
  {
    icon: Building2,
    title: "Single-Window System",
    body: "Multi-layered bureaucracy causes tremendous time loss, frequently causing traders to lose international buyers. A consolidated single-window system is strongly advocated.",
  },
  {
    icon: CalendarDays,
    title: "August 26, 2026 — AIDC Workshop",
    body: "AATMA participated in a one-day stakeholders' workshop organized by the Assam Industrial Development Corporation Limited, in the presence of Honorable Minister of Forest, Minister of Agriculture and Minister of Industry.",
  },
];

function ChallengeItem({ challenge, index }: { challenge: Challenge; index: number }) {
  const Icon = challenge.icon;

  return (
    <Reveal
      variant="up"
      delay={index * 100}
      className="group flex gap-5 md:gap-6 items-start bg-glass-card backdrop-blur-xl rounded-lg border border-white/20 border-l-4 border-l-gamosa-red shadow-lg p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 active:-translate-y-1 hover:shadow-[0_10px_32px_rgba(0,0,0,0.35)] active:shadow-[0_10px_32px_rgba(0,0,0,0.35)] hover:border-l-terracotta active:border-l-terracotta"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gamosa-red/10 text-gamosa-red transition-colors duration-300 group-hover:bg-gamosa-red group-active:bg-gamosa-red group-hover:text-white group-active:text-white">
        <Icon className="h-5 w-5" aria-hidden="true" focusable="false" />
      </span>

      <div className="min-w-0">
        <h3 className="font-display font-bold text-lg leading-snug text-agar-title mb-2">
          {challenge.title}
        </h3>
        <p className="text-agar-body text-sm md:text-[0.95rem] leading-relaxed">
          {challenge.body}
        </p>
      </div>
    </Reveal>
  );
}

export function ChallengesSection({ className }: { className?: ClassValue }) {
  return (
    <section
      id="challenges"
      className={cn(
        "relative py-20 md:py-28 scroll-mt-20 overflow-hidden",
        className,
      )}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(198,123,92,0.07)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <Reveal variant="fade" delay={0} className="text-center mb-14 md:mb-18">
          <span className="inline-block text-agar-label text-sm font-semibold tracking-[0.25em] uppercase bg-glass-card backdrop-blur-xl border border-white/20 px-4 py-1.5 rounded-sm mb-4">
            Ongoing Challenges
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-agar-title mb-6">
            The Way Forward
          </h2>
          <p className="text-agar-body text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            While we have finally achieved legal status for the agar trade, the
            current license fees remain quite high for small-scale and general
            traders, and the overall registration process is overly lengthy.
          </p>
        </Reveal>

        {/* Challenge items */}
        <Stagger
          staggerMs={100}
          className="flex flex-col gap-4 md:gap-5 max-w-4xl mx-auto"
        >
          {CHALLENGES.map((challenge, i) => (
            <ChallengeItem
              key={challenge.title}
              challenge={challenge}
              index={i}
            />
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default ChallengesSection;
