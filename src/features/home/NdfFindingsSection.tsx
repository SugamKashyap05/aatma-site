import { cn, type ClassValue, assetUrl } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { TreePine, MapPin, Microscope, Globe } from "lucide-react";

/**
 * NdfFindingsSection — Non-Detriment Findings (NDF) data section.
 *
 * Presents the findings of the NDF Study commissioned by MoEF&CC through
 * the Botanical Survey of India (BSI), report published February 2024.
 * Covers Aquilaria malaccensis conservation status, cultivated tree
 * population in Assam, and the districts surveyed.
 *
 * Layout: 2-column grid — text content + images on the left, fact cards
 * on the right. Images: plantation-present-day.jpg, conservation-habitat.jpg.
 */

interface FactItem {
  icon: typeof TreePine;
  label: string;
  description: string;
}

const FACTS: FactItem[] = [
  {
    icon: TreePine,
    label: "1143.7 Lakh",
    description:
      "Cultivated Agar Tree Assam Population (>2 years of age & >10 cm GBH)",
  },
  {
    icon: MapPin,
    label: "5 Districts",
    description:
      "Golaghat, Jorhat, Sibsagar, Karimganj and Cachar — major cultivated agar tree population",
  },
  {
    icon: Microscope,
    label: "BSI Study",
    description:
      "Botanical Survey of India — report submitted February 2024",
  },
  {
    icon: Globe,
    label: "CITES App. II",
    description:
      "Listed since 16 February 1995 — trade within sustainable limits",
  },
];

function FactCard({ fact, index }: { fact: FactItem; index: number }) {
  const Icon = fact.icon;
  return (
    <Reveal
      variant="up"
      delay={index * 80}
      className="flex items-center gap-4 bg-white rounded-xl border border-cream-dark shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
    >
      <div className="w-12 h-12 rounded-xl bg-[linear-gradient(135deg,var(--color-green-mid),var(--color-green-deep))] flex items-center justify-center text-cream flex-shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <strong className="block text-green-deep font-display font-bold text-lg leading-tight">
          {fact.label}
        </strong>
        <span className="text-text-mute text-sm leading-snug">
          {fact.description}
        </span>
      </div>
    </Reveal>
  );
}

export function NdfFindingsSection({ className }: { className?: ClassValue }) {
  return (
    <section
      id="ndf-findings"
      className={cn(
        "relative py-20 md:py-28 scroll-mt-20 bg-cream overflow-hidden",
        className,
      )}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.05)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ---- Left: text content + images ---- */}
          <div>
            <Reveal variant="fade" delay={0}>
              <span className="inline-block text-gold-deep text-sm font-semibold tracking-[0.25em] uppercase mb-4">
                Research
              </span>
            </Reveal>

            <Reveal variant="up" delay={100}>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-charcoal mb-6">
                Non-Detriment Findings
              </h2>
            </Reveal>

            <Reveal variant="fade" delay={200}>
              <p className="text-text-mute text-base md:text-lg leading-relaxed mb-5">
                MoEF&CC commissioned the NDF Study through the Botanical
                Survey of India (BSI) and the BSI had submitted the report
                in February 2024. The work was carried out by following the
                &lsquo;CITES Non-detriment Findings Guidance for Perennial
                Plants&rsquo; (Wolf &amp; al 2016).
              </p>
            </Reveal>

            <Reveal variant="fade" delay={300}>
              <p className="text-text-mute text-base md:text-lg leading-relaxed mb-8">
                <em className="text-charcoal font-medium">
                  Aquilaria malaccensis
                </em>{" "}
                is listed as a Critically Endangered (CR) Species in the
                IUCN Red List of Threatened Species. The species is listed
                under CITES Appendix-II (w.e.f. 16th February 1995).
              </p>
            </Reveal>

            {/* Images */}
            <Reveal variant="scale" delay={400} rootMargin="0px 0px 200px 0px">
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-lg shadow-md border border-cream-dark">
                  <img
                    src={assetUrl("history/plantation-present-day.jpg")}
                    alt="Present-day agar plantation in Assam"
                    className="w-full h-40 md:h-48 object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-lg shadow-md border border-cream-dark">
                  <img
                    src={assetUrl("research/conservation-habitat.jpg")}
                    alt="Natural conservation habitat of Aquilaria malaccensis"
                    className="w-full h-40 md:h-48 object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---- Right: fact cards ---- */}
          <div className="flex flex-col gap-4">
            {FACTS.map((fact, i) => (
              <FactCard key={fact.label} fact={fact} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NdfFindingsSection;
