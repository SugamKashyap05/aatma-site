import type { Book } from "@/data/books";
import { BOOKS } from "@/data/books";
import { BookCard } from "./BookCard";
import { Stagger, Reveal } from "@/components/ui/reveal";

interface BookLibraryProps {
  onRead: (book: Book) => void;
  onDownload: (book: Book) => void;
  downloadingId?: string | null;
}

export function BookLibrary({ onRead, onDownload, downloadingId }: BookLibraryProps) {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
        <Reveal variant="fade">
          <span className="inline-block text-gold text-sm font-semibold tracking-[0.25em] uppercase bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-sm mb-4">
            Library
          </span>
        </Reveal>
        <Reveal variant="up" delay={100}>
          <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            AATMA <span className="text-gold">Publications</span>
          </h1>
        </Reveal>
        <Reveal variant="fade" delay={200}>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
            Research, history, and policy documents from the association's work.
          </p>
        </Reveal>
      </div>

      {/* Grid */}
      <Stagger
        staggerMs={100}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {BOOKS.map((book) => (
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
    </div>
  );
}
