import { useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Book, Chapter } from "@/data/books";
import { FONT_SIZE_MAP } from "@/hooks/useBookReader";
import { PageTurn } from "./PageTurn";

interface ReadingAreaProps {
  book: Book;
  chapter: Chapter;
  chapterIndex: number;
  fontSize: string;
  darkMode: boolean;
  onPrev: () => void;
  onNext: () => void;
  readingRef: React.RefObject<HTMLDivElement | null>;
}

export function ReadingArea({
  book,
  chapter,
  chapterIndex,
  fontSize,
  darkMode,
  onPrev,
  onNext,
  readingRef,
}: ReadingAreaProps) {
  const isFirst = chapterIndex === 0;
  const isLast = chapterIndex === book.chapters.length - 1;

  // Scroll to top on chapter change
  useEffect(() => {
    if (readingRef.current) {
      readingRef.current.scrollTo({ top: 0 });
    }
  }, [chapterIndex, readingRef]);

  return (
    <main
      ref={readingRef}
      className={cn(
        "flex-1 overflow-y-auto transition-colors duration-300",
        darkMode ? "bg-green-deep" : "bg-cream"
      )}
      role="main"
      aria-label="Reading area"
    >
      <div className="max-w-3xl mx-auto px-6 py-12">
        <PageTurn pageKey={String(chapterIndex)}>
          {/* Chapter header */}
          <div className="mb-8">
            <div className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Chapter {chapterIndex + 1} of {book.chapters.length}
            </div>
            <h1
              className={cn(
                "font-display font-bold text-2xl md:text-3xl mb-2",
                darkMode ? "text-white" : "text-charcoal"
              )}
            >
              {chapter.title}
            </h1>
            {chapter.subtitle && (
              <p className={cn("text-base", darkMode ? "text-white/60" : "text-mute")}>
                {chapter.subtitle}
              </p>
            )}
          </div>

          {/* Chapter body or page image */}
          {chapter.image ? (
            <div className="flex justify-center">
              <img
                src={chapter.image}
                alt={`Page ${chapterIndex + 1} of ${book.title}`}
                className="max-w-full h-auto rounded-lg shadow-2xl"
                loading="eager"
              />
            </div>
          ) : (
            <div className={cn("space-y-6", FONT_SIZE_MAP[fontSize as keyof typeof FONT_SIZE_MAP])}>
              {chapter.body.map((para, i) => (
                <p
                  key={i}
                  className={cn(
                    "leading-relaxed",
                    darkMode ? "text-white/90" : "text",
                    i === 0 && "first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.8]"
                  )}
                >
                  {para}
                </p>
              ))}
            </div>
          )}

          {/* Chapter navigation */}
          <div className="mt-16 flex items-center justify-between">
            <button
              onClick={onPrev}
              disabled={isFirst}
              className={cn(
                "flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-h-[44px] px-2",
                darkMode ? "text-white/60 hover:text-gold" : "text-mute hover:text-gold"
              )}
              aria-label="Previous chapter"
            >
              <ChevronRight size={16} className="rotate-180" />
              Previous
            </button>
            <button
              onClick={onNext}
              disabled={isLast}
              className={cn(
                "flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-h-[44px] px-2",
                darkMode ? "text-white/60 hover:text-gold" : "text-mute hover:text-gold"
              )}
              aria-label="Next chapter"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </PageTurn>
      </div>
    </main>
  );
}
