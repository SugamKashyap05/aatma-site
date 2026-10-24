import type { Book } from "@/data/books";
import { BookOpen, Download } from "lucide-react";
import { ProvenanceBadge } from "@/components/ui/provenance-badge";

interface BookCardProps {
  book: Book;
  onRead: (book: Book) => void;
  onDownload: (book: Book) => void;
  isDownloading?: boolean;
}

export function BookCard({ book, onRead, onDownload, isDownloading }: BookCardProps) {
  const claims = book.unverifiedClaims ?? [];

  return (
    <div className="card-hover glass-surface group relative rounded-sm overflow-hidden">
      {/* Cover */}
      <div className="aspect-[3/4] relative overflow-hidden bg-green-deep">
        {book.coverImage ? (
          <>
            <img
              src={book.coverImage}
              alt={`Cover of ${book.title}`}
              aria-hidden="false"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-deep/80 via-transparent to-transparent" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center border-y border-gold/30">
            <BookOpen size={36} className="text-gold-light" aria-hidden="true" focusable="false" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Provenance label */}
        <ProvenanceBadge provenance={book.provenance} className="mb-3" />

        <h3 className="font-display font-bold text-lg text-white mb-1 leading-snug">
          {book.title}
        </h3>
        <p className="text-cream/75 text-sm mb-1">{book.author}</p>
        <p className="text-cream/75 text-xs mb-4">
          {book.publishedYear ? `${book.publishedYear} · ` : ""}
          {book.totalPages ? `${book.totalPages} scanned pages · ${book.format}` : `${book.chapterCount} sections · ${book.format}`}
        </p>

        {/* Where it comes from, stated in full */}
        <p className="text-white/70 text-xs leading-relaxed mb-4">{book.provenanceNote}</p>

        {/* Claims still waiting on a client-supplied source */}
        {claims.length > 0 && (
          <details className="mb-4 rounded-sm border border-gold/25 bg-gold/[0.06] px-3 py-2">
            <summary className="cursor-pointer text-gold-light text-xs font-semibold tracking-wide">
              {claims.length} claim{claims.length === 1 ? "" : "s"} pending a source
            </summary>
            <ul className="mt-2 space-y-1 list-disc list-inside text-white/75 text-xs leading-relaxed">
              {claims.map((claim) => (
                <li key={claim}>{claim}</li>
              ))}
            </ul>
          </details>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onRead(book)}
            className="flex-1 flex items-center justify-center gap-2 bg-gold text-green-deep px-4 py-2 rounded-sm text-sm font-semibold hover:bg-gold-light transition-colors min-h-[44px]"
            aria-label={`Read ${book.title}`}
          >
            <BookOpen size={16} aria-hidden="true" focusable="false" />
            Read
          </button>
          <button
            onClick={() => onDownload(book)}
            disabled={isDownloading}
            className="flex items-center justify-center gap-2 border border-white/20 text-white px-4 py-2 rounded-sm text-sm hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] disabled:opacity-60 disabled:cursor-wait"
            aria-label={isDownloading ? `Preparing download of ${book.title}` : `Download ${book.title}`}
            aria-busy={isDownloading}
          >
            {isDownloading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="text-xs">Preparing…</span>
              </>
            ) : (
              <Download size={16} aria-hidden="true" focusable="false" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
