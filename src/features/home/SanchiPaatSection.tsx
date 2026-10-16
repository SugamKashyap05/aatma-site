import { cn, type ClassValue } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/**
 * SanchiPaatSection — a section about sacred scriptures written on agar bark.
 *
 * The bark of the agar tree (sanchi paat) was used as a writing surface
 * for centuries in Assam, preserving religious teachings, poetry, and
 * historical records. This section presents that tradition as a
 * historical/cultural artifact display with a decorative manuscript-style
 * frame, the historical image, and Assamese script.
 */
export function SanchiPaatSection({ className }: { className?: ClassValue }) {
  return (
    <section
      id="sanchi-paat"
      className={cn(
        "relative py-20 md:py-28 scroll-mt-20 bg-cream overflow-hidden",
        className,
      )}
    >
      {/* Subtle paper-texture radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,201,176,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ---- Text content ---- */}
          <div className="order-2 lg:order-1">
            <Reveal variant="fade" delay={0}>
              <span className="inline-block text-gold-deep text-sm font-semibold tracking-[0.25em] uppercase mb-4">
                Ancient Tradition
              </span>
            </Reveal>

            <Reveal variant="up" delay={100}>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-charcoal mb-6">
                Sanchi Paat
              </h2>
            </Reveal>

            <Reveal variant="fade" delay={200}>
              <p className="text-text-mute text-base md:text-lg leading-relaxed mb-6">
                Bark of the agar tree — called{" "}
                <em className="text-charcoal font-medium">sanchi paat</em> — was
                used for writing scripture and sacred texts for centuries in
                Assam. The smooth, durable inner bark served as a natural canvas
                for scholars and scribes, preserving religious teachings, poetry,
                and historical records long before paper reached the region.
              </p>
            </Reveal>

            <Reveal variant="fade" delay={300}>
              <p className="text-text-mute text-base md:text-lg leading-relaxed mb-8">
                These manuscripts represent a living connection to Assam's
                literary and spiritual heritage — a tradition where the agar
                tree, already prized for its fragrant resin, also gave its bark
                to preserve knowledge and faith.
              </p>
            </Reveal>

            {/* Assamese script */}
            <Reveal variant="fade" delay={400}>
              <div className="border-l-4 border-gold/50 pl-6 py-2">
                <p className="font-assamese text-2xl md:text-3xl text-charcoal/80 leading-relaxed">
                  সানচি পাতত শাস্ত্র লিখা হৈছিল
                </p>
                <p className="mt-2 text-text-mute text-sm italic">
                  &ldquo;Scripture was written on sanchi paat&rdquo;
                </p>
              </div>
            </Reveal>
          </div>

          {/* ---- Manuscript image in decorative frame ---- */}
          <div className="order-1 lg:order-2">
            <Reveal variant="scale" delay={200} rootMargin="0px 0px 300px 0px">
              <div className="relative mx-auto max-w-md lg:max-w-full">
                {/* Ornate manuscript frame — nested borders */}
                <div className="border-[3px] border-gold/50 p-2.5 bg-cream-dark/30 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                  <div className="border-2 border-gold/40 p-5 md:p-7 bg-cream-dark/50">
                    <div className="border border-gold/30 p-3">
                      <div className="border border-gold/20 p-2 bg-white/60">
                        <img
                          src="/history/sanchi-paat-manuscript.jpg"
                          alt="Ancient sanchi paat manuscript — sacred scripture written on agar bark"
                          className="w-full h-auto object-contain"
                          loading="lazy"
                        />
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
