import { cn, type ClassValue } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Stagger } from "@/components/ui/reveal";

/**
 * RulesSection — 4-card section presenting the Assam Wood Based Industries
 * (Promotion & Development) Rules, 2022.
 *
 * Each card has a badge label, title, and description. Content is exact
 * from brief §9 NOTIFICATION. The 2022 Rules replaced the 2000 licensing
 * regime with a registration framework, legalized 800+ cottage industries
 * at their present locations, and introduced CITES-compliant record-keeping.
 */

interface RuleCard {
  badge: string;
  title: string;
  description: string;
}

const RULE_CARDS: RuleCard[] = [
  {
    badge: "Registration",
    title: "Register, Don't License",
    description:
      "Industries need only to be registered with the forest department — no more licensing regime. Registration valid for five (5) years.",
  },
  {
    badge: "Location",
    title: "Operate from Present Location",
    description:
      "800+ cottage industries can function from their present locations without shifting to designated industrial estates.",
  },
  {
    badge: "CITES",
    title: "Fully CITES Compliant",
    description:
      "Registration of industry, registration of plantations, stock register of inbound and outbound raw materials — all under ease of doing business.",
  },
  {
    badge: "Scale",
    title: "Micro to Large",
    description:
      "Categorization into Micro, Small, Medium and Large units based on aggregate capacity — provides necessary impetus for small traders.",
  },
];

function RuleCardItem({ card, index }: { card: RuleCard; index: number }) {
  return (
    <Reveal
      variant="up"
      delay={index * 80}
      className="group relative bg-white rounded-xl border-t-4 border-gold shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
    >
      {/* Badge label */}
      <span className="inline-block bg-gold text-green-deep font-display font-bold text-xs tracking-wider px-3 py-1 rounded-full mb-4 uppercase">
        {card.badge}
      </span>

      <h3 className="font-display font-bold text-green-deep text-lg mb-3 leading-snug">
        {card.title}
      </h3>

      <p className="text-text-mute text-sm leading-relaxed">
        {card.description}
      </p>
    </Reveal>
  );
}

export function RulesSection({ className }: { className?: ClassValue }) {
  return (
    <section
      id="rules"
      className={cn(
        "relative py-20 md:py-28 scroll-mt-20 bg-cream-dark overflow-hidden",
        className,
      )}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.06)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <Reveal variant="fade" delay={0} className="text-center mb-14">
          <span className="inline-block text-gold-deep text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Policy
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-charcoal mb-6">
            Assam Wood Based Industries (Promotion &amp; Development) Rules, 2022
          </h2>
          <p className="text-text-mute text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Under the new set of Rules, the Agar wood based industries have been
            newly categorized into Secondary Wood-Based Industries and
            licensing has been done away with. They need only to be registered
            with the forest department and start functioning legally at present
            location without shifting to any other place.
          </p>
        </Reveal>

        {/* Card grid — 2×2 responsive */}
        <Stagger staggerMs={100} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RULE_CARDS.map((card, i) => (
            <RuleCardItem key={card.badge} card={card} index={i} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default RulesSection;
