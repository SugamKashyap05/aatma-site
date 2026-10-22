import { cn, type ClassValue } from "@/lib/utils";
import { assetUrl } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/**
 * SanchiPaatSection — a section about the client-documented use of agar bark
 * for writing scriptures. Displays the original manuscript image from the book.
 */
export function SanchiPaatSection({ className }: { className?: ClassValue }) {
  return (
    <section
      id="sanchi-paat"
      className={cn(
        "relative py-20 md:py-28 scroll-mt-20 overflow-hidden",
        className,
      )}
    >
      {/* Subtle paper-texture radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,201,176,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ---- Text content ---- */}
          <div className="order-2 lg:order-1 bg-glass-card backdrop-blur-xl border border-white/20 rounded-xl p-6 md:p-8 shadow-lg">
            <Reveal variant="fade" delay={0}>
              <span className="inline-block text-agar-label text-sm font-semibold tracking-[0.25em] uppercase mb-4">
                Ancient Tradition
              </span>
            </Reveal>

            <Reveal variant="up" delay={100}>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-agar-title mb-6">
                Sanchi Paat
              </h2>
            </Reveal>

            <Reveal variant="fade" delay={200}>
              <p className="text-agar-body text-base md:text-lg leading-relaxed mb-6">
                Bark of the agar tree — called{" "}
                <em className="text-agar-title font-medium">sanchi paat</em> — was
                used for writing scriptures. The renowned Vaishnav saints of Assam
                — Srimanta Sankar Dev, Madhav Deb, and Damudar Deb — used
                Sanchipat for writing scriptures.
              </p>
            </Reveal>
          </div>

          {/* ---- Original book image in a decorative frame ---- */}
          <div className="order-1 lg:order-2">
            <Reveal variant="scale" delay={200} rootMargin="0px 0px 300px 0px">
              <div className="relative mx-auto max-w-md lg:max-w-full">
                {/* Ornate manuscript frame — nested borders */}
                <div className="border-[3px] border-gold/50 p-2.5 bg-cream-dark/30 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                  <div className="border-2 border-gold/40 p-5 md:p-7 bg-cream-dark/50">
                    <div className="border border-gold/30 p-3">
                      <div className="border border-gold/20 p-2">
                        <figure className="flex flex-col items-center gap-4 bg-white/60 p-3 text-center">
                          <img
                            src={assetUrl("history/sanchi-paat-original.png")}
                            alt="Original book image of a Sanchiputhi manuscript written on Sanchipat."
                            className="w-full h-auto rounded shadow-lg"
                            loading="eager"
                            decoding="async"
                          />
                          <figcaption className="max-w-full font-sans text-xs leading-relaxed text-charcoal/75 md:text-sm">
                            <span className="block font-medium">
                              255-year-old “Sanchiputhi” written on Sanchipat.
                            </span>
                            <span className="block">
                              Courtesy: Sri Sri Narowa Balisatra Parichalana Samiti, P.O. Balisatra, Dist. Nagaon, Assam.
                            </span>
                          </figcaption>
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative corner accents */}
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gold/70" />
                <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-gold/70" />
                <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-gold/70" />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gold/70" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SanchiPaatSection;
