import { useBookReader } from "@/hooks/useBookReader";
import { assetUrl } from "@/lib/utils";
import { ArrowLeft, Download } from "lucide-react";
import { ReaderTopBar } from "./ReaderTopBar";
import { ProgressBar } from "./ProgressBar";
import { TableOfContents } from "./TableOfContents";
import { ReadingArea } from "./ReadingArea";
import { ImageReader } from "./ImageReader";
import type { Book } from "@/data/books";
import { ProvenanceBadge } from "@/components/ui/provenance-badge";

interface BookReaderProps {
  book: Book;
  onBack: () => void;
}

export function BookReader({ book, onBack }: BookReaderProps) {
  const reader = useBookReader(book);
  const { chapter, chapterIndex, fontSize, darkMode, progress, tocOpen, readingRef } =
    reader;

  if (book.readerMode) {
    const documentUrl = assetUrl(book.filePath);
    const fileName = book.filePath.split("/").pop() ?? book.slug;
    return (
      <div className="min-h-screen bg-green-deep flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          {book.coverImage && (
            <img
              src={assetUrl(book.coverImage)}
              alt={`Cover of ${book.title}`}
              className="w-full rounded-lg shadow-2xl mb-8"
            />
          )}
          <h2 className="font-display text-xl md:text-2xl text-white mb-3">
            {book.title}
          </h2>
          <p className="text-white/70 text-sm mb-2">{book.author}</p>
          <p className="text-white/50 text-xs mb-8">
            {book.format} · {book.totalPages} pages
          </p>
          <div className="border-b border-glass-border bg-glass-surface-subtle rounded-lg px-4 py-3 mb-8 text-left">
            <div className="flex flex-wrap items-center gap-3">
              <ProvenanceBadge provenance={book.provenance} />
              <p className="text-white/70 text-xs leading-relaxed flex-1 min-w-[16rem]">
                {book.provenanceNote}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={documentUrl}
              download={fileName}
              className="inline-flex items-center gap-2 bg-gold-deep hover:bg-gold-light text-green-deep font-semibold text-sm min-h-[44px] px-6 rounded-lg transition-colors"
              aria-label={`Download ${book.title} (${book.format})`}
            >
              <Download size={18} aria-hidden="true" />
              <span>Download PDF</span>
            </a>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-white/80 hover:text-gold-light text-sm font-medium min-h-[44px] px-4 rounded-lg border border-white/20 transition-colors"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              <span>Back to Books</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!chapter) return null;

  return (
    <div className="min-h-screen bg-green-deep">
      <ReaderTopBar
        title={book.title}
        fontSize={fontSize}
        darkMode={darkMode}
        onBack={onBack}
        onToggleToc={reader.toggleToc}
        onIncreaseFont={reader.increaseFontSize}
        onDecreaseFont={reader.decreaseFontSize}
        onToggleDarkMode={reader.toggleDarkMode}
        onDownload={reader.downloadBook}
      />

      <ProgressBar progress={progress} />

      {/* What the reader is showing — a client publication or a site summary */}
      <div className="border-b border-glass-border bg-glass-surface-subtle">
        <div className="max-w-4xl mx-auto px-4 py-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <ProvenanceBadge provenance={book.provenance} />
          <p className="text-white/70 text-xs leading-relaxed flex-1 min-w-[16rem]">
            {book.provenanceNote}
          </p>
        </div>
      </div>

      <div className="flex">
        {chapter.image ? (
          <ImageReader
            book={book}
            chapter={chapter}
            chapterIndex={chapterIndex}
            darkMode={darkMode}
            onGoToChapter={reader.goToChapter}
            readingRef={readingRef}
          />
        ) : (
          <ReadingArea
            book={book}
            chapter={chapter}
            chapterIndex={chapterIndex}
            fontSize={fontSize}
            darkMode={darkMode}
            onPrev={reader.prevChapter}
            onNext={reader.nextChapter}
            readingRef={readingRef}
          />
        )}

        <TableOfContents
          chapters={book.chapters}
          activeIndex={chapterIndex}
          onSelect={reader.goToChapter}
          onClose={reader.closeToc}
          open={tocOpen}
        />
      </div>
      {/* aria-live region for screen reader page announcements */}
      <div aria-live="polite" className="sr-only">
        Chapter {chapterIndex + 1} of {book.chapters.length}: {chapter.title}
      </div>
    </div>
  );
}
