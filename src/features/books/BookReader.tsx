import { useBookReader } from "@/hooks/useBookReader";
import { ReaderTopBar } from "./ReaderTopBar";
import { ProgressBar } from "./ProgressBar";
import { TableOfContents } from "./TableOfContents";
import { ReadingArea } from "./ReadingArea";
import type { Book } from "@/data/books";

interface BookReaderProps {
  book: Book;
  onBack: () => void;
}

export function BookReader({ book, onBack }: BookReaderProps) {
  const reader = useBookReader(book);
  const { chapter, chapterIndex, fontSize, darkMode, progress, tocOpen, readingRef } =
    reader;

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

      <div className="flex">
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
