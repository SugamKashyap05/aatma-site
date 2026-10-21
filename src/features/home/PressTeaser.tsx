import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Megaphone,
  Newspaper,
  ScrollText,
} from "lucide-react";
import { cn, type ClassValue } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Stagger } from "@/components/ui/reveal";
import { PRESS_RELEASES } from "@/data/press";

/**
 * PressTeaser — compact press & resources teaser for the home page.
 *
 * Surfaces the press releases AATMA actually issued and selected resource
 * documents, and links to the dedicated /press and /resources pages for the
 * full archives.
 *
 * Every press item below is a real AATMA document — the list comes from
 * `src/data/press.ts`, so it cannot drift from the /press page. No fabricated
 * quotes or testimonials, and no AATMA member names: only role descriptions
 * and the names of public officials retained per client instruction
 * (docs/APPROVED_CONTENT_LEDGER.md, contradiction C3).
 *
 * Ledger sources:
 *   • [PRESS] — documents/AATMA press note Rev.docx (14 Jan 2023)
 *   • [HCM]  — documents/AATMA to HCM.docx (14 Jan 2023)
 *   • [HIST] — documents/A BRIEF HISTORY OF AGAR.pdf
 */

interface PressItem {
  icon: typeof Megaphone;
  category: string;
  title: string;
  date: string;
  summary: string;
}

interface ResourceItem {
  icon: typeof FileText;
  title: string;
  description: string;
}

/**
 * Map the shared press-release list onto the teaser card shape.
 *
 * An earlier revision of this file carried its own hard-coded copy of the same
 * two items, which meant a change to a release had to be made in two places.
 */
const PRESS_ITEMS: PressItem[] = PRESS_RELEASES.map((release) => ({
  icon: release.category === "Press Release" ? Megaphone : ScrollText,
  category: release.category,
  title: release.title,
  date: release.date,
  summary: release.summary,
}));

const RESOURCE_ITEMS: ResourceItem[] = [
  {
    icon: FileText,
    title: "Agarwood Trade History",
    description:
      "AATMA's account of the agarwood trade — from the sanchi-paat era and the Hojai distillation trade through the 2000 rules and the campaign that led to the 2022 reforms.",
  },
  {
    icon: Newspaper,
    title: "Seminar Abstracts",
    description:
      "Collected abstracts of papers presented at the national seminar on the scope and dimension of agar plantation in the North East, organised by AATMA at the Assam Administrative Staff College, Guwahati.",
  },
];

function PressCard({ item, index }: { item: PressItem; index: number }) {
  const Icon = item.icon;

  return (
    <Reveal
      variant="up"
      delay={index * 100}
      className="group relative flex h-full flex-col bg-white rounded-xl border border-cream-dark shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6 transition-all duration-300 hover:-translate-y-1 active:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] active:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
    >
      {/* Category + date */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Icon
            size={14}
            className="text-gamosa-red"
            aria-hidden="true"
            focusable="false"
          />
          <span className="text-xs font-semibold tracking-[0.12em] uppercase text-gamosa-red">
            {item.category}
          </span>
        </div>
        <span className="text-xs text-text-mute">{item.date}</span>
      </div>

      <h3 className="font-display font-bold text-green-deep text-base md:text-lg leading-snug mb-3">
        {item.title}
      </h3>

      <p className="text-text-mute text-sm leading-relaxed flex-1">
        {item.summary}
      </p>
    </Reveal>
  );
}

function ResourceCard({ item, index }: { item: ResourceItem; index: number }) {
  const Icon = item.icon;

  return (
    <Reveal
      variant="up"
      delay={index * 100}
      className="group flex items-start gap-4 bg-white rounded-xl border border-cream-dark shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5 transition-all duration-300 hover:-translate-y-0.5 active:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] active:shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
    >
      <div className="w-10 h-10 rounded-lg bg-[linear-gradient(135deg,var(--color-green-mid),var(--color-green-deep))] flex items-center justify-center text-cream flex-shrink-0">
        <Icon
          className="w-5 h-5"
          aria-hidden="true"
          focusable="false"
        />
      </div>
      <div className="min-w-0">
        <h3 className="font-display font-bold text-green-deep text-sm md:text-base leading-snug mb-1">
          {item.title}
        </h3>
        <p className="text-text-mute text-sm leading-snug">
          {item.description}
        </p>
      </div>
    </Reveal>
  );
}

export function PressTeaser({ className }: { className?: ClassValue }) {
  return (
    <section
      id="press"
      className={cn(
        "relative py-20 md:py-28 scroll-mt-20 overflow-hidden",
        className,
      )}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,168,76,0.06)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <Reveal variant="fade" delay={0} className="text-center mb-14">
          <span className="inline-block text-gamosa-red text-sm font-semibold tracking-[0.25em] uppercase bg-white/60 px-4 py-1.5 rounded-sm mb-4">
            Press &amp; Resources
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-charcoal mb-6">
            Official Communications
          </h2>
          <p className="text-text-mute text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Client-supplied press releases, official letters, and resource documents from AATMA.
          </p>
        </Reveal>

        {/* Press releases */}
        <div className="max-w-4xl mx-auto mb-12">
          <Reveal variant="fade" delay={0}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gamosa-red/30" />
              <h3 className="font-display font-bold text-charcoal text-sm md:text-base tracking-wide">
                Press Releases
              </h3>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gamosa-red/30" />
            </div>
          </Reveal>

          <Stagger staggerMs={100} className="grid md:grid-cols-2 gap-5">
            {PRESS_ITEMS.map((item, i) => (
              <PressCard key={item.title} item={item} index={i} />
            ))}
          </Stagger>
        </div>

        {/* Resources */}
        <div className="max-w-4xl mx-auto mb-12">
          <Reveal variant="fade" delay={0}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gamosa-red/30" />
              <h3 className="font-display font-bold text-charcoal text-sm md:text-base tracking-wide">
                Resource Documents
              </h3>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gamosa-red/30" />
            </div>
          </Reveal>

          <Stagger staggerMs={100} className="grid md:grid-cols-2 gap-5">
            {RESOURCE_ITEMS.map((item, i) => (
              <ResourceCard key={item.title} item={item} index={i} />
            ))}
          </Stagger>
        </div>

        {/* Links to dedicated pages */}
        <Reveal variant="up" delay={200} className="text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/press"
              className="inline-flex items-center gap-2 bg-green-deep text-cream text-sm font-medium tracking-wide px-6 py-3 rounded-sm transition-all duration-300 hover:bg-green-mid active:bg-green-mid min-h-[44px] group"
            >
              Visit Press &amp; Media
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1"
              />
            </Link>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 bg-white text-green-deep text-sm font-medium tracking-wide px-6 py-3 rounded-sm border border-cream-dark transition-all duration-300 hover:bg-cream active:bg-cream min-h-[44px] group"
            >
              Browse Resources
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-0.5 group-active:-translate-y-0.5"
              />
            </Link>
          </div>
        </Reveal>

        {/* Source footer */}
        <Reveal variant="fade" delay={100}>
          <p className="mt-10 border-t border-cream-dark pt-4 text-xs leading-relaxed text-text-mute text-center">
            Sources: AATMA press note Rev.docx (14 Jan 2023); AATMA to HCM.docx
            (14 Jan 2023); A BRIEF HISTORY OF AGAR.pdf.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default PressTeaser;
