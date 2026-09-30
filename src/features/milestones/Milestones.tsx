import { cn, type ClassValue } from "@/lib/utils";
import { AmbientMotion } from "@/features/ambient/AmbientMotion";
import { Reveal } from "@/components/ui/reveal";
import Timeline from "@/components/ui/timeline";
import { MILESTONES } from "@/data/content";

export function Milestones({ className, deviceTier }: { className?: ClassValue; deviceTier?: "mobile" | "tablet" | "desktop" }) {
  const isMobile = deviceTier === "mobile";

  const timelineItems = MILESTONES.map((m) => ({
    year: m.year,
    title: m.title,
    description: m.body,
    image: "linear-gradient(135deg, #1a3c2a 0%, #2d5a3d 50%, #1a3c2a 100%)",
    badge: m.tag,
  }));

  return (
    <section
      id="milestones"
      className={cn(
        "relative py-20 md:py-28 overflow-hidden scroll-mt-20 text-white",
        className
      )}
    >
      <AmbientMotion
        variant={isMobile ? "fog" : "clouds"}
        theme="light"
        layers={isMobile ? 1 : 2}
        speed={isMobile ? 70 : 55}
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,168,76,0.12)_0%,rgba(0,0,0,0)_65%)] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-14 md:mb-18">
          <Reveal variant="fade" delay={0}>
            <span className="inline-block text-gold text-sm font-semibold tracking-[0.25em] uppercase bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-sm mb-4">
              Our Milestones
            </span>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl leading-tight mb-6 drop-shadow-sm">
              Five decades of{" "}
              <span className="text-gold">progress</span>
            </h2>
          </Reveal>
          <Reveal variant="fade" delay={200}>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
              From a meeting of traders in Hojai in 1976 to Assam's first legal
              export in 2025 — key moments in the association's story and the
              sector's transformation.
            </p>
          </Reveal>
        </div>

        <Reveal variant="fade" delay={300}>
          <Timeline items={timelineItems} />
        </Reveal>
      </div>
    </section>
  );
}
