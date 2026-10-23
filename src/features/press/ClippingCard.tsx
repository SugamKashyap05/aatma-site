import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { assetUrl } from "@/lib/utils";
import type { NewsArticle } from "@/data/news";
import { ClippingLightbox } from "@/components/ui/ClippingLightbox";
import { Reveal } from "@/components/ui/reveal";

/**
 * ClippingCard — one newspaper clipping on /press.
 *
 * The scan is the content: these are photographs of newsprint, and several are
 * in Bengali or Assamese script. Rather than a site-authored transcription, the
 * card enlarges the scan itself in an accessible lightbox, so the visitor reads
 * exactly what the newspaper printed.
 */

export function ClippingCard({
  article,
  index,
}: {
  article: NewsArticle;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  const formattedDate = new Date(article.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const citation = [
    article.outlet,
    article.page ? `p.${article.page}` : null,
    formattedDate,
    article.language,
    article.byline ? `By ${article.byline}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const src = article.imagePath ? assetUrl(article.imagePath) : "";

  return (
    <Reveal variant="up" delay={(index % 2) * 100}>
      <article className="glass-surface flex h-full flex-col overflow-hidden rounded-sm">
        {src ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative block w-full cursor-zoom-in border-b border-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            aria-label={`Enlarge the clipping: ${article.headline}`}
          >
            <img
              src={src}
              alt={article.imageAlt ?? article.headline}
              className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
              decoding="async"
            />
            <span className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-green-deep/85 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="inline-flex items-center gap-1.5 rounded-sm bg-green-deep/90 px-2.5 py-1.5 text-xs font-medium text-gold-light">
                <ZoomIn size={13} aria-hidden="true" focusable="false" />
                Click to enlarge
              </span>
            </span>
          </button>
        ) : null}

        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs leading-relaxed text-cream/60">{citation}</p>
          <h4 className="mt-2 font-display text-base font-semibold text-white">
            {article.headline}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-cream/75">
            {article.excerpt}
          </p>
        </div>
      </article>

      <ClippingLightbox
        open={open}
        src={src}
        alt={article.imageAlt ?? article.headline}
        title={article.headline}
        meta={citation}
        onClose={() => setOpen(false)}
      />
    </Reveal>
  );
}

export default ClippingCard;
