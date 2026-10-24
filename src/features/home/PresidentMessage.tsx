import { cn, type ClassValue } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/**
 * PresidentMessage — the President's message to the association.
 *
 * The client replaced the brief's opening editorial with this message and
 * asked for it to close the homepage, above the footer, under this tag.
 * The wording is verbatim from the client's message. The four paragraph
 * breaks fall on the message's own sentence boundaries and change no wording.
 * The section's own h2 ("Message from the President") was removed at the
 * client's request (2026-10-24); only the "From the President" tag remains.
 */

const MESSAGE_PARAGRAPHS = [
  "When the restrictive Assam Wood Based Industries Rules were enacted on February 15, 2000, it plunged our traditional agarwood trade into deep uncertainty, prompting our disheartened community to convene an urgent meeting where I was entrusted with the presidency of AATMA to lead our fight for survival.",
  "Refusing to let our heritage perish, we embarked on a relentless 22-year struggle, knocking on the doors of every successive government and debating with every Chief Minister to free our cottage industry from those crippling laws.",
  "Today, while our collective resilience has finally secured historic relief and legal recognition, our mission remains unfinished. We are actively continuing our dialogue with the government to secure further vital administrative and financial relaxations for our micro and small-scale traders.",
  "AATMA is driven by the unwavering vision that every cultivator and trader—no matter how small—must be empowered to operate efficiently, prosper profitably, and proudly take Assam's magnificent agarwood legacy to the global stage.",
] as const;

const PRESIDENT = {
  author: "Ataur Rahman",
  role: "President, AATMA",
} as const;

/**
 * PresidentMessage — default export matches sibling section components.
 */
export function PresidentMessage({ className }: { className?: ClassValue }) {
  return (
    <section
      id="president-message"
      className={cn(
        "relative py-20 md:py-28 scroll-mt-20 overflow-hidden",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.06)_0%,rgba(0,0,0,0)_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal variant="fade" delay={0} className="mb-14 text-center">
          <span className="inline-block rounded-sm border border-white/20 bg-glass-card px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.25em] text-agar-label backdrop-blur-xl">
            From the President
          </span>
        </Reveal>

        <Reveal variant="up" delay={100}>
          <article className="mx-auto max-w-4xl rounded-sm border border-white/20 bg-glass-card p-6 shadow-lg backdrop-blur-xl md:p-10">
            <div className="mx-auto max-w-3xl space-y-5">
              {MESSAGE_PARAGRAPHS.map((paragraph, index) => (
                <p
                  key={index}
                  data-president-message-paragraph
                  className="text-base leading-relaxed text-agar-body md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <footer className="mx-auto mt-8 max-w-3xl border-t border-white/10 pt-6 text-agar-label">
              <div className="font-display font-semibold">{PRESIDENT.author}</div>
              <div className="text-sm">{PRESIDENT.role}</div>
            </footer>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export default PresidentMessage;
