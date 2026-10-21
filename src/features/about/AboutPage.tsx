import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import PageLayout from "@/components/ui/PageLayout";
import { Reveal } from "@/components/ui/reveal";
import { ABOUT_SPINE, ABOUT_BYLINE } from "@/data/about-spine";

/**
 * AboutPage — the complete client brief, in sequential order.
 *
 * The client directive was to present the entire brief as it is
 * (documents/A brief note on Agar Trade (2).docx): all ten headed sections,
 * 31 paragraphs, verbatim. `ABOUT_SPINE` is the only source of body text —
 * nothing is paraphrased or corrected here, including source slips. Each
 * block ends with links into the homepage sections and routes that expand
 * that part of the story.
 */
export function AboutPage() {
  return (
    <PageLayout
      badge="About AATMA"
      badgeIcon={<BookOpen size={14} />}
      title="A Brief Note on the Agar Trade"
      subtitle="The Association's account in full and in order — each section links to the part of this site that expands it."
    >
      <div className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-12 md:space-y-16">
          <Reveal variant="fade" delay={0}>
            <p className="text-center text-agar-label text-sm md:text-base tracking-wide">
              {ABOUT_BYLINE}
            </p>
          </Reveal>

          {/* Contents — the brief's ten sections in sequential order */}
          <Reveal variant="up" delay={100}>
            <nav
              aria-label="Contents — the brief's ten sections"
              className="bg-glass-card backdrop-blur-xl border border-white/20 rounded-sm p-6 md:p-8 shadow-lg"
            >
              <span className="text-agar-label text-xs md:text-sm font-semibold tracking-[0.25em] uppercase">
                Contents
              </span>
              <ol className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-10">
                {ABOUT_SPINE.map((section) => (
                  <li key={section.num}>
                    <a
                      href={`#spine-${section.num.toLowerCase()}`}
                      className="group flex min-h-[44px] items-baseline gap-3 rounded-sm py-2 text-agar-body text-sm md:text-base transition-colors duration-200 hover:text-agar-label focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      <span className="font-display text-agar-label tabular-nums">
                        {section.num}
                      </span>
                      <span className="leading-snug">{section.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>

          {/* The ten blocks, verbatim */}
          {ABOUT_SPINE.map((section) => (
            <Reveal
              key={section.num}
              variant="up"
              delay={50}
              rootMargin="0px 0px 200px 0px"
            >
              <article
                id={`spine-${section.num.toLowerCase()}`}
                className="scroll-mt-24 bg-glass-card backdrop-blur-xl border border-white/20 rounded-sm p-6 md:p-10 shadow-lg"
              >
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-display text-agar-label text-xl md:text-2xl font-bold">
                    {section.num}
                  </span>
                  <h2 className="font-display font-bold text-2xl md:text-3xl leading-tight text-agar-title">
                    {section.heading}
                  </h2>
                </div>
                <div className="space-y-5 max-w-3xl">
                  {section.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-agar-body text-base md:text-lg leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 max-w-3xl">
                  <span className="text-agar-label text-xs uppercase tracking-widest">
                    Explore on this site
                  </span>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {section.deepDives.map((dive) => (
                      <Link
                        key={`${dive.href}-${dive.label}`}
                        to={dive.href}
                        className="group inline-flex min-h-[44px] items-center gap-2 rounded-sm text-sm font-medium tracking-wide text-agar-label border border-white/20 bg-green-deep/40 px-5 py-2.5 transition-colors duration-300 hover:bg-green-deep/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                      >
                        {dive.label}
                        <ArrowRight
                          size={14}
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default AboutPage;
