import type { HistoryChapter } from "@/data/history-chapters";
import { Reveal } from "@/components/ui/reveal";

/**
 * One era chapter of the /history page.
 *
 * Layout alternates the image left/right down the page so consecutive
 * chapters do not repeat the same silhouette. The section number is the
 * client's own section number from the source document, not a site-authored
 * ordering, so the page can be read against the PDF.
 */
export function HistoryChapterSection({
  chapter,
  flip,
}: {
  chapter: HistoryChapter;
  flip: boolean;
}) {
  const image = chapter.image;

  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-heading`}
      className="scroll-mt-24 border-t border-gold/15 py-14 md:py-18"
    >
      <Reveal variant="fade" delay={0}>
        <div className="mb-3 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 font-display text-xs font-bold text-gold-light"
          >
            {chapter.num}
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-light">
            {chapter.kicker}
          </span>
        </div>
      </Reveal>

      <div
        className={`grid gap-8 md:gap-12 ${
          image ? "md:grid-cols-12 md:items-start" : ""
        }`}
      >
        <Reveal
          variant="up"
          delay={60}
          className={image ? (flip ? "md:col-span-7 md:order-2" : "md:col-span-7") : ""}
        >
          <h2
            id={`${chapter.id}-heading`}
            className="mb-5 font-display text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl"
          >
            {chapter.heading}
          </h2>
          <div className="max-w-prose space-y-4">
            {chapter.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-white/75 md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {chapter.highlights && chapter.highlights.length > 0 && (
            <dl className="mt-7 grid gap-3 border-t border-gold/15 pt-6 sm:grid-cols-2 lg:grid-cols-3">
              {chapter.highlights.map((highlight) => (
                <div key={highlight.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/60">
                    {highlight.label}
                  </dt>
                  <dd className="mt-1 font-display text-sm font-semibold text-gold-light md:text-base">
                    {highlight.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>

        {image && (
          <Reveal
            variant="up"
            delay={140}
            className={flip ? "md:col-span-5 md:order-1" : "md:col-span-5"}
          >
            <figure className="glass-surface overflow-hidden rounded-sm">
              <img
                src={image.src}
                alt={image.alt}
                className={
                  image.fit === "contain"
                    ? "aspect-square w-full bg-white object-contain"
                    : "h-56 w-full object-cover md:h-64 lg:h-72"
                }
                loading="lazy"
                decoding="async"
              />
              <figcaption className="p-4 text-sm leading-relaxed text-cream/75">
                {image.caption}
              </figcaption>
            </figure>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export default HistoryChapterSection;
