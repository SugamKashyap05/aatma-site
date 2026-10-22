import { cn, type ClassValue } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/**
 * AchievementSection — summarizes the 2021 CM meeting, notification of the
 * 2022 WBI Rules in January 2023, and the February 2023 Stakeholders Conference.
 *
 * The final client brief supports more than 800 cottage industries on the
 * ground and describes 22 years of struggle. The 22-year phrase is sourced
 * from the brief; it is not calculated from the 2000–2016 Critical Era dates.
 * The 2021 passage spells the Chief Minister's surname “Sharma”, while §9
 * and AATMA's press note/letter use “Sarma”; this summary follows the latter.
 * Government officials are retained; no AATMA member names are used.
 */

const STATS = [
  { value: "1976", label: "AATMA formed" },
  { value: ">800", label: "Agarwood cottage industries on the ground" },
  { value: "22", label: "Years of Struggle" },
  { value: "2022", label: "WBI Rules" },
] as const;

const EVENTS = [
  {
    date: "July 19, 2021",
    title: "Memorandum to the Chief Minister",
    body: "An AATMA delegation accompanied by Mr. Sirajuddin Ajmal, MLA, met the Chief Minister of Assam, Dr. Himanta Biswa Sarma, and submitted a memorandum apprising him of the ongoing problems faced by the agar industries for the last 21 years. The Chief Minister patiently listened to the delegation, acknowledged the memorandum, and assured them he would work on resolving the matter.",
  },
  {
    date: "January 12, 2023",
    title: "WBI Rules 2022 Notified",
    body: "The Assam Wood Based Industries (Promotion & Development) Rules, 2022 were notified. The old licensing regime was done away with — units need only register with the forest department and can function legally at their present location.",
  },
  {
    date: "February 14, 2023",
    title: "Stakeholders Conference",
    body: "A Stakeholders Conference was organized on 14 February 2023 to explain the Assam Wood Based Industries (Promotion & Development) Rules, 2022 and the Assam Trees Outside Forest (Sustainable Management) Rules, 2022 to relevant industry stakeholders, in the presence of the Environment & Forests Department, Government of Assam.",
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
        "relative py-20 md:py-28 scroll-mt-20 overflow-hidden",
        className,
      )}
    >

      {/* Subtle radial texture so the deep-green field is not flat */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(224,200,120,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ---- Section header ---- */}
        <Reveal variant="fade" delay={0}>
          <span className="inline-block text-agar-label text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Achievement
          </span>
        </Reveal>

        <Reveal variant="up" delay={100}>
          <div className="mx-auto max-w-4xl bg-glass-card backdrop-blur-xl rounded-sm p-6 md:p-8 shadow-lg border border-white/20 space-y-5">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-agar-title">
              A New Dawn for the Agarwood Trade
            </h2>
            <p className="text-agar-body text-base md:text-lg leading-relaxed">
              Following this on 19 July 2021, an AATMA delegation accompanied
              by Mr. Sirajuddin Ajmal, MLA, met with the Chief Minister of
              Assam, Dr. Himanta Biswa Sarma, to submit a memorandum apprising
              him of the ongoing problems faced by the agar industries for the
              last 21 years. The Chief Minister patiently listened to the
              delegation, acknowledged the memorandum, and assured them he would
              work on resolving the matter. True to his assurance, the
              Chief Minister of Assam and his government took a fresh, positive
              approach to the long-standing, vexed issue — and the association
              extends its sincere thanks to Dr. Himanta Biswa Sarma for
              notifying the Assam Wood Based Industries (Promotion &amp;
              Development) Rules, 2022 on 12 January 2023.
            </p>
          </div>
        </Reveal>

        {/* ---- Stats row ---- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10 md:mt-14">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} variant="up" delay={i * 100}>
              <div className="bg-glass-card backdrop-blur-xl border border-white/20 rounded-lg p-6 shadow-lg">
                <div className="font-display font-bold text-4xl md:text-5xl text-agar-label">
                  {stat.value}
                </div>
                <div className="mt-2 text-agar-body text-xs md:text-sm uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---- Client-sourced milestone timeline ---- */}
        <div className="mt-16 md:mt-20">
          {/* Timeline of achievement events */}
          <Reveal variant="fade" delay={100} className="mx-auto max-w-4xl">
            <div className="bg-glass-card backdrop-blur-xl border border-white/20 rounded-sm p-6 md:p-8 shadow-lg">
              <ol className="relative space-y-10 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-gold/30">
              {EVENTS.map((event) => (
                <li key={event.date} className="relative pl-10">
                  {/* Timeline node */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-gold ring-4 ring-green-deep"
                  />
                  <span className="inline-block text-agar-label font-semibold tracking-wide text-sm uppercase">
                    {event.date}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl text-agar-title mt-1 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-agar-body text-sm md:text-base leading-relaxed">
                    {event.body}
                  </p>
                </li>
              ))}
            </ol>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

export default AchievementSection;
