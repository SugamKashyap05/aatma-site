import { cn, type ClassValue, assetUrl } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/**
 * AchievementSection — celebrates AATMA's hard-won victory after 22 years
 * of struggle: the 2021 CM meeting, the 2022 WBI Rules, and the 2023
 * Stakeholders Conference.
 *
 * Layout: header → stats row (50+ / 800+ / 22 / 2022) → achievement
 * timeline alongside the victory-2023 photograph.
 *
 * Anonymization (plan §3.3): government officials retained
 * (Mr. Sirajuddin Ajmal, MLA; Dr. Himanta Biswa Sharma, CM of Assam).
 * No AATMA member names are used — the delegation is referenced
 * generically.
 */

const STATS = [
  { value: "50+", label: "Years of Legacy" },
  { value: "800+", label: "Industries Represented" },
  { value: "22", label: "Years of Struggle" },
  { value: "2022", label: "New WBI Rules" },
] as const;

const EVENTS = [
  {
    date: "July 19, 2021",
    title: "Memorandum to the Chief Minister",
    body: "An AATMA delegation accompanied by Mr. Sirajuddin Ajmal, MLA, met the Chief Minister of Assam, Dr. Himanta Biswa Sharma, and submitted a memorandum apprising him of the problems faced by the agar industries for over two decades. The Chief Minister gave the delegation a patient hearing, acknowledged the memorandum, and assured them he would work on resolving the matter.",
  },
  {
    date: "January 12, 2023",
    title: "WBI Rules 2022 Enacted",
    body: "The Assam Wood Based Industries (Promotion & Development) Rules, 2022 were enacted. The old licensing regime was done away with — units need only register with the forest department and can function legally at their present location.",
  },
  {
    date: "February 14, 2023",
    title: "Stakeholders Conference",
    body: "A Stakeholders Conference was held, bringing together industry members and associates to chart the way forward under the newly enacted rules.",
  },
] as const;

/**
 * AchievementSection — default export matches sibling section components.
 */
export function AchievementSection({ className }: { className?: ClassValue }) {
  return (
    <section
      id="achievement"
      className={cn(
        "relative py-20 md:py-28 scroll-mt-20 bg-green-deep overflow-hidden",
        className,
      )}
    >
      {/* Subtle radial texture so the deep-green field is not flat */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(224,200,120,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ---- Section header ---- */}
        <Reveal variant="fade" delay={0}>
          <span className="inline-block text-gold-deep text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Achievement
          </span>
        </Reveal>

        <Reveal variant="up" delay={100}>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-cream mb-6">
            A New Dawn for the Agarwood Trade
          </h2>
        </Reveal>

        <Reveal variant="fade" delay={200}>
          <p className="text-cream/70 text-base md:text-lg leading-relaxed max-w-3xl mb-6">
            After more than two decades of struggle, the turning point came
            on 19 July 2021, when an AATMA delegation accompanied by Mr.
            Sirajuddin Ajmal, MLA, met the Chief Minister of Assam, Dr. Himanta
            Biswa Sharma, and submitted a memorandum on the problems faced by
            the agar industries. True to his assurance, the Government of Assam
            took a fresh, positive approach to the long-standing issue — and AATMA
            extends its sincere thanks to the Chief Minister for enacting the
            Assam Wood Based Industries (Promotion &amp; Development) Rules, 2022
            on 12 January 2023.
          </p>
        </Reveal>

        {/* ---- Stats row ---- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10 md:mt-14">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} variant="up" delay={i * 100}>
              <div className="text-center p-6 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                <div className="font-display font-bold text-4xl md:text-5xl text-gold">
                  {stat.value}
                </div>
                <div className="mt-2 text-cream/70 text-xs md:text-sm uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---- Timeline + victory image ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-16 md:mt-20">
          {/* Timeline of achievement events */}
          <Reveal variant="fade" delay={100}>
            <ol className="relative space-y-10 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-gold/30">
              {EVENTS.map((event) => (
                <li key={event.date} className="relative pl-10">
                  {/* Timeline node */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-gold ring-4 ring-green-deep"
                  />
                  <span className="inline-block text-gold font-semibold tracking-wide text-sm uppercase">
                    {event.date}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl text-cream mt-1 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-cream/70 text-sm md:text-base leading-relaxed">
                    {event.body}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Victory photograph */}
          <Reveal variant="scale" delay={200} rootMargin="0px 0px 300px 0px">
            <div className="relative mx-auto max-w-md lg:max-w-full">
              <div className="border-2 border-gold/40 rounded-lg overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
                <img
                  src={assetUrl("history/victory-2023.jpg")}
                  alt="AATMA members celebrating the enactment of the WBI Rules 2023"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative corner accents */}
              <div aria-hidden="true" className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-gold/70" />
              <div aria-hidden="true" className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-gold/70" />
              <div aria-hidden="true" className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-gold/70" />
              <div aria-hidden="true" className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-gold/70" />
              <p className="mt-4 text-center text-cream/50 text-xs italic">
                Stakeholders Conference — February 2023
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default AchievementSection;
