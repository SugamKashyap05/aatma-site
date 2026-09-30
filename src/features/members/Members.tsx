import { cn, type ClassValue } from "@/lib/utils";
import { AmbientMotion } from "@/features/ambient/AmbientMotion";
import { Users, Handshake, Leaf } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, Stagger } from "@/components/ui/reveal";

interface MsCard {
  rank: string;
  icon: LucideIcon;
  title: string;
  body: string;
  initials: string;
}

const CARDS: MsCard[] = [
  {
    rank: "Leadership",
    icon: Users,
    title: "Office Bearers & Council",
    body: `AATMA is governed by a body of elected and nominated office bearers drawn from across the agar trade and agaroil manufacturing sectors of Assam. The council brings together voices from the districts at the heart of the trade — Hojai, Golaghat, Jorhat, and Sivasagar — to represent the association's full membership in its engagements with government, with CITES and export licensing, and with the wider industry and markets.`,
    initials: "OB",
  },
  {
    rank: "The Membership",
    icon: Handshake,
    title: "Traders, Distillers & Cultivators",
    body: `AATMA's membership spans the full agarwood value chain: agarwood traders, agaroil manufacturers and distilleries, agar cultivators and plantation owners, and the wider community of businesses and families whose livelihoods depend on the trade. The association represents members across the Upper Assam districts where agarwood cultivation and trade have their deepest roots.`,
    initials: "TD",
  },
  {
    rank: "What We Represent",
    icon: Leaf,
    title: "The Complete Agar Value Chain",
    body: `From the farmer who plants and tends an agar tree on their land, to the distiller who carefully extracts the precious oil, to the trader who brings the product to market — AATMA's remit covers the complete agarwood value chain. The association works to ensure that every link in the chain — cultivation, harvesting, processing, transit, and sale — is conducted within a legal, documented, and sustainable framework, and that the livelihoods of the people who depend on it are secured for the long term.`,
    initials: "AV",
  },
];

const STATS = [
  { value: "1976", label: "Year Established" },
  { value: "78–79", label: "Registration No." },
  { value: "Hojai", label: "Headquarters" },
  { value: "4 Districts", label: "Core Coverage" },
];

export function Members({ className, deviceTier }: { className?: ClassValue; deviceTier?: "mobile" | "tablet" | "desktop" }) {
  const isMobile = deviceTier === "mobile";

  return (
    <section
      id="members"
      className={cn(
        "relative py-20 md:py-28 overflow-hidden scroll-mt-20 text-white",
        className
      )}
    >
      <AmbientMotion
        variant={isMobile ? "fog" : "fog"}
        theme="green"
        layers={isMobile ? 1 : 2}
        speed={isMobile ? 65 : 50}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.08)_0%,rgba(0,0,0,0)_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14 md:mb-18">
          <Reveal variant="fade" delay={0}>
            <span className="inline-block text-gold text-sm font-semibold tracking-[0.25em] uppercase bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-sm mb-4">
              Our Members
            </span>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
              The people behind the trade
            </h2>
          </Reveal>
          <Reveal variant="fade" delay={200}>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
              An association built from the ground up — by traders, by distillers, and by the families who have tended agar trees through generations in the forests and homesteads of Upper Assam.
            </p>
          </Reveal>
        </div>

        {/* Stat strip */}
        <Stagger staggerMs={100} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 max-w-3xl mx-auto">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="card-hover backdrop-blur-sm bg-white/10 border border-white/10 rounded-sm p-5 text-center"
            >
              <div className="font-display text-2xl md:text-3xl text-gold font-bold mb-1">
                {s.value}
              </div>
              <div className="text-white/60 text-xs md:text-sm font-medium tracking-wide text-center uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </Stagger>

        {/* Member value chain cards */}
        <Stagger staggerMs={120} className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="card-hover relative group backdrop-blur-sm bg-white/[0.12] border border-white/15 rounded-sm p-5 md:p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="shrink-0 w-12 h-12 rounded-full border-2 border-gold/60 bg-green-deep/40 flex items-center justify-center text-gold font-display font-bold text-sm tracking-wide"
                  aria-label={`${card.title} placeholder avatar`}
                >
                  {card.initials}
                </div>
                <div className="shrink-0">
                  <card.icon size={28} strokeWidth={1.5} className="text-gold" />
                </div>
              </div>
              <div className="text-gold text-xs font-semibold tracking-[0.15em] uppercase mb-2">
                {card.rank}
              </div>
              <h3 className="font-display font-bold text-lg md:text-xl text-white mb-3 leading-snug">
                {card.title}
              </h3>
              <div className="text-white/70 text-sm leading-relaxed">{card.body}</div>
              <div className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </Stagger>

        <Reveal variant="fade" delay={200} className="mt-14 text-center">
          <a
            href="#contact"
            className={cn(
              "inline-flex items-center gap-2 px-7 py-3 bg-gold text-green-deep font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-gold-light transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30",
              isMobile && "w-full justify-center"
            )}
          >
            Join AATMA
          </a>
        </Reveal>
      </div>
    </section>
  );
}
