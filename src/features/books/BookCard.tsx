import type { Book } from "@/data/books";
import { BookOpen, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: Book;
  onRead: (book: Book) => void;
  onDownload: (book: Book) => void;
  isDownloading?: boolean;
}

export function BookCard({ book, onRead, onDownload, isDownloading }: BookCardProps) {
  return (
    <div className="card-hover group relative bg-white/[0.12] backdrop-blur-sm border border-white/15 rounded-sm overflow-hidden">
      {/* Cover */}
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-deep/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-white mb-1 leading-snug">
          {book.title}
        </h3>
        <p className="text-white/60 text-sm mb-1">{book.author}</p>
        <p className="text-white/40 text-xs mb-4">
          {book.publishedYear} · {book.chapterCount} chapters · {book.readingTime} min
          read
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onRead(book)}
            className="flex-1 flex items-center justify-center gap-2 bg-gold text-green-deep px-4 py-2 rounded-sm text-sm font-semibold hover:bg-gold-light transition-colors min-h-[44px]"
            aria-label={`Read ${book.title}`}
          >
            <BookOpen size={16} />
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
              <Download size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
