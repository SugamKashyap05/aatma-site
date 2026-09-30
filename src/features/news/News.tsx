import { cn, type ClassValue } from "@/lib/utils";
import { AmbientMotion } from "@/features/ambient/AmbientMotion";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger } from "@/components/ui/reveal";

const ARTICLES = [
  {
    tag: "Development",
    title: "Assam Cabinet allows growing and cutting of Agar & Chandan on non-forest land",
    summary: "The July 2019 decision permits agar cultivation up to 35 bighas (≈5 hectares) without permission, and ends the ban on felling agar, sal, and sishu trees on private land.",
    imageGradient: "from-green-deep/30 via-green-mid/10 to-transparent",
  },
  {
    tag: "Policy",
    title: "Assam Agarwood Promotion Policy 2020 — legalising the trade chain",
    summary: "The policy, effective from 2021, brings plantation, harvesting, processing, transit, and sale of agar into a formal legal framework on non-forest land.",
    imageGradient: "from-gold/20 via-green-deep/10 to-transparent",
  },
  {
    tag: "Export",
    title: "India secures CITES export quota for agarwood — 2024 to 2027",
    summary: "India's successful trading proposal sets a quota of 1,51,080 kg of chips & powder and 7,050 kg of oil per year, with Assam receiving the largest state-wise share.",
    imageGradient: "from-green-deep/40 via-emerald/10 to-transparent",
  },
  {
    tag: "Milestone",
    title: "Assam's first legal agarwood export departs Guwahati",
    summary: "A consignment of 100 kg of premium agarwood chips to Saudi Arabia and 12 kg to the UAE — valued at a combined ₹2.35 crore — departs Lokpriya Gopinath Bordoloi International Airport.",
    imageGradient: "from-gold/25 via-green-mid/10 to-transparent",
  },
];

export function NewsSection({ className, deviceTier }: { className?: ClassValue; deviceTier?: "mobile" | "tablet" | "desktop" }) {
  const isMobile = deviceTier === "mobile";

  return (
    <section
      id="news"
      className={cn(
        "relative py-20 md:py-28 overflow-hidden scroll-mt-20 text-white",
        className
      )}
    >
      <AmbientMotion
        variant={isMobile ? "fog" : "particles"}
        theme="light"
        layers={isMobile ? 1 : 1}
        speed={isMobile ? 85 : 70}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,168,76,0.06)_0%,rgba(0,0,0,0)_65%)] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-14 md:mb-18">
          <Reveal variant="fade" delay={0}>
            <span className="inline-block text-gold text-sm font-semibold tracking-[0.25em] uppercase bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-1.5 rounded-sm mb-4">
              News & Developments
            </span>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="font-display font-bold text-xl md:text-3xl lg:text-4xl leading-tight mb-6">
              The sector, in{" "}
              <span className="text-gold">motion</span>
            </h2>
          </Reveal>
          <Reveal variant="fade" delay={200}>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
              Key developments in the agarwood sector and the association's work — from policy landmarks to the first legal exports.
            </p>
          </Reveal>
        </div>

        <Stagger staggerMs={120} className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {ARTICLES.map((article, i) => (
            <article
              key={i}
              className="card-hover group relative bg-white/[0.12] backdrop-blur-sm border border-white/20 rounded-sm overflow-hidden shadow-sm"
            >
              <div
                className={cn("aspect-[16/9] overflow-hidden", article.imageGradient)}
                role="img"
                aria-label={`Article image: ${article.title}`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-green-mid/30">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              </div>
              <div className="p-5 md:p-6">
                <span className="text-xs font-semibold tracking-[0.15em] text-white uppercase bg-white/10 px-2.5 py-0.5 rounded-sm border border-white/15 group-hover:bg-gold/20 group-hover:text-gold group-hover:border-gold/30 transition-all duration-300">
                  {article.tag}
                </span>
                <h3 className="mt-3 font-display font-bold text-base md:text-lg text-white leading-snug group-hover:text-gold transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="mt-2 text-white/60 text-sm md:text-base leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </article>
          ))}
        </Stagger>

        <Reveal variant="fade" delay={200} className="mt-12 text-center">
          <a
            href="#contact"
            className={cn(
              "inline-flex items-center gap-2 text-white/70 text-sm font-medium tracking-wide hover:text-gold transition-colors duration-300 group",
              isMobile && "justify-center"
            )}
          >
            Stay informed about AATMA
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight size={16} strokeWidth={2} />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
