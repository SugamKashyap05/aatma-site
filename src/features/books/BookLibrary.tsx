import type { Book, PublicationProvenance } from "@/data/books";
import { BOOKS } from "@/data/books";
import { BookCard } from "./BookCard";
import { Stagger, Reveal } from "@/components/ui/reveal";
import {
  ProvenanceBadge,
  provenanceDescription,
  provenanceLabel,
} from "@/components/ui/provenance-badge";

interface BookLibraryProps {
  onRead: (book: Book) => void;
  onDownload: (book: Book) => void;
  downloadingId?: string | null;
  showHeader?: boolean;
}

/**
 * Order client-provided materials as they appear in the association's library.
 */
const PROVENANCE_ORDER: PublicationProvenance[] = ["client-publication"];

function ProvenanceLegend() {
  return (
    <div className="max-w-6xl mx-auto mb-12 grid sm:grid-cols-2 gap-4">
      {PROVENANCE_ORDER.map((provenance) => (
        <div
          key={provenance}
          className="glass-surface rounded-sm p-4"
        >
          <ProvenanceBadge provenance={provenance} />
          <p className="mt-2 text-white/75 text-xs leading-relaxed">
            {provenanceDescription(provenance)}
          </p>
        </div>
      ))}
    </div>
  );
}

export function BookLibrary({ onRead, onDownload, downloadingId, showHeader = true }: BookLibraryProps) {
  return (
    <div>
      {/* Header — suppressed when PageLayout already renders a hero */}
      {showHeader && (
        <div className="text-center mb-12">
          <Reveal variant="fade">
            <span className="glass-surface-subtle inline-block text-gold-light text-sm font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-sm mb-4">
              Library
            </span>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
              AATMA <span className="text-gold-light">Library</span>
            </h1>
          </Reveal>
          <Reveal variant="fade" delay={200}>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
              AATMA's own publications, reproduced on the site with their source stated.
            </p>
          </Reveal>
        </div>
      )}

      <ProvenanceLegend />

      {/* One group per provenance class — never a single mixed grid */}
      {PROVENANCE_ORDER.map((provenance) => {
        const books = BOOKS.filter((book) => book.provenance === provenance);
        if (books.length === 0) return null;

        return (
          <section
            key={provenance}
            className="max-w-6xl mx-auto mb-14 last:mb-0"
            aria-label={provenanceLabel(provenance)}
          >
            <h2 className="font-display font-bold text-xl md:text-2xl text-white mb-1">
              {provenanceLabel(provenance)}
              <span className="text-cream/75 text-base font-normal"> · {books.length}</span>
            </h2>
            <p className="text-white/70 text-sm mb-6 max-w-2xl">
              {provenanceDescription(provenance)}
            </p>
            <Stagger
              staggerMs={100}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {books.map((book) => (
                <div key={book.id} role="listitem">
                  <BookCard
                    book={book}
                    onRead={onRead}
                    onDownload={onDownload}
                    isDownloading={downloadingId === book.id}
                  />
                </div>
              ))}
            </Stagger>
          </section>
        );
      })}
    </div>
  );
}
