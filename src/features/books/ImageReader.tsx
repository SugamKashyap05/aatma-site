import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageTurn } from "./PageTurn";
import type { Book, Chapter } from "@/data/books";

interface ImageReaderProps {
  book: Book;
  chapter: Chapter;
  chapterIndex: number;
  darkMode: boolean;
  onPrev: () => void;
  onNext: () => void;
  onGoToChapter: (index: number) => void;
  readingRef: React.RefObject<HTMLDivElement | null>;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.5;
const SWIPE_THRESHOLD = 50;

/**
 * Image-based reader component for books with scanned page images.
 * Features: pinch-to-zoom, double-tap zoom, drag-to-pan, swipe navigation,
 * thumbnail strip for quick page jumping.
 */
export function ImageReader({
  book,
  chapter,
  chapterIndex,
  darkMode,
  onPrev,
  onNext,
  onGoToChapter,
  readingRef,
}: ImageReaderProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef({ x: 0, y: 0 });
  const lastTap = useRef(0);
  const lastTouchDist = useRef(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const isFirst = chapterIndex === 0;
  const isLast = chapterIndex === book.chapters.length - 1;

  // Reset zoom on chapter change
  useEffect(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, [chapterIndex]);

  // Clamp offset to prevent dragging image out of view
  const clampOffset = useCallback((x: number, y: number, s: number) => {
    if (s <= 1) return { x: 0, y: 0 };
    const container = containerRef.current;
    if (!container) return { x: 0, y: 0 };
    const maxX = (container.clientWidth * (s - 1)) / 2;
    const maxY = (container.clientHeight * (s - 1)) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  }, []);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => {
      const next = Math.min(prev + ZOOM_STEP, MAX_SCALE);
      setOffset((o) => clampOffset(o.x, o.y, next));
      return next;
    });
  }, [clampOffset]);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => {
      const next = Math.max(prev - ZOOM_STEP, MIN_SCALE);
      setOffset((o) => clampOffset(o.x, o.y, next));
      return next;
    });
  }, [clampOffset]);

  const handleResetZoom = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  // Touch handlers for pinch-to-zoom, double-tap, and swipe
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastTouchDist.current = Math.sqrt(dx * dx + dy * dy);
      } else if (e.touches.length === 1) {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;

        // Double-tap detection
        const now = Date.now();
        if (now - lastTap.current < 300) {
          if (scale > 1) {
            handleResetZoom();
          } else {
            setScale(2);
          }
        }
        lastTap.current = now;

        // Start drag when zoomed in
        if (scale > 1) {
          setIsDragging(true);
          dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          offsetStart.current = { ...offset };
        }
      }
    },
    [scale, offset, handleResetZoom]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        // Pinch-to-zoom
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (lastTouchDist.current > 0) {
          const delta = dist - lastTouchDist.current;
          const zoomFactor = 1 + delta * 0.005;
          setScale((prev) => {
            const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, prev * zoomFactor));
            setOffset((o) => clampOffset(o.x, o.y, next));
            return next;
          });
        }
        lastTouchDist.current = dist;
      } else if (e.touches.length === 1 && isDragging && scale > 1) {
        // Drag to pan when zoomed in
        const dx = e.touches[0].clientX - dragStart.current.x;
        const dy = e.touches[0].clientY - dragStart.current.y;
        setOffset(clampOffset(offsetStart.current.x + dx, offsetStart.current.y + dy, scale));
      }
    },
    [isDragging, scale, clampOffset]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      // Swipe navigation when not zoomed in
      if (e.changedTouches.length === 1 && scale === 1) {
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        const dy = e.changedTouches[0].clientY - touchStartY.current;
        if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0 && !isLast) {
            onNext();
          } else if (dx > 0 && !isFirst) {
            onPrev();
          }
        }
      }
      setIsDragging(false);
      lastTouchDist.current = 0;
    },
    [scale, isLast, isFirst, onNext, onPrev]
  );

  // Mouse drag for desktop panning
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (scale > 1) {
        setIsDragging(true);
        dragStart.current = { x: e.clientX, y: e.clientY };
        offsetStart.current = { ...offset };
      }
    },
    [scale, offset]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && scale > 1) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        setOffset(clampOffset(offsetStart.current.x + dx, offsetStart.current.y + dy, scale));
      }
    },
    [isDragging, scale, clampOffset]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Scroll to top on chapter change
  useEffect(() => {
    if (readingRef.current) {
      readingRef.current.scrollTo({ top: 0 });
    }
  }, [chapterIndex, readingRef]);

  if (!chapter) return null;

  return (
    <>
      <main
        ref={readingRef}
        className={cn(
          "flex-1 overflow-y-auto transition-colors duration-300",
          darkMode ? "bg-green-deep" : "bg-cream"
        )}
        role="main"
        aria-label="Image reading area"
      >
        <div className="max-w-4xl mx-auto px-4 py-8 pb-28">
          <PageTurn pageKey={String(chapterIndex)}>
            {/* Chapter header */}
            <div className="mb-6">
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
            </div>

            {/* Image container with zoom and pan */}
            <div
              ref={containerRef}
              className={cn(
                "relative rounded-lg overflow-hidden",
                scale > 1 ? "cursor-grab" : "cursor-default",
                isDragging && "cursor-grabbing"
              )}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                src={chapter.image}
                alt={`Page ${chapterIndex + 1} of ${book.title}`}
                className="w-full h-auto select-none"
                style={{
                  transform: `scale(${scale}) translate(${offset.x / scale}px, ${offset.y / scale}px)`,
                  transition: isDragging ? "none" : "transform 0.2s ease-out",
                }}
                draggable={false}
              />

              {/* Zoom controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={handleZoomIn}
                  disabled={scale >= MAX_SCALE}
                  className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Zoom in"
                >
                  <ZoomIn size={18} />
                </button>
                <button
                  onClick={handleZoomOut}
                  disabled={scale <= MIN_SCALE}
                  className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Zoom out"
                >
                  <ZoomOut size={18} />
                </button>
                <button
                  onClick={handleResetZoom}
                  disabled={scale === 1}
                  className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Reset zoom"
                >
                  <Maximize size={18} />
                </button>
              </div>

              {/* Zoom level indicator */}
              {scale > 1 && (
                <div className="absolute bottom-4 left-4 px-2 py-1 bg-black/50 text-white text-xs rounded">
                  {Math.round(scale * 100)}%
                </div>
              )}
            </div>

            {/* Page navigation */}
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={onPrev}
                disabled={isFirst}
                className={cn(
                  "flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-h-[44px] px-2",
                  darkMode ? "text-white/60 hover:text-gold" : "text-mute hover:text-gold"
                )}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <span className={cn("text-sm", darkMode ? "text-white/40" : "text-mute")}>
                Page {chapterIndex + 1} of {book.chapters.length}
              </span>
              <button
                onClick={onNext}
                disabled={isLast}
                className={cn(
                  "flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-h-[44px] px-2",
                  darkMode ? "text-white/60 hover:text-gold" : "text-mute hover:text-gold"
                )}
                aria-label="Next page"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </PageTurn>
        </div>
      </main>

      {/* Fixed thumbnail strip for quick navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-green-deep/95 backdrop-blur-md border-t border-white/10">
        <div className="flex gap-2 overflow-x-auto px-4 py-2 no-scrollbar">
          {book.chapters.map((ch, i) => (
            <button
              key={ch.id}
              onClick={() => onGoToChapter(i)}
              className={cn(
                "flex-shrink-0 w-12 h-16 rounded overflow-hidden border-2 transition-colors",
                i === chapterIndex
                  ? "border-gold"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
              aria-label={`Go to page ${i + 1}: ${ch.title}`}
              aria-current={i === chapterIndex ? "true" : undefined}
            >
              <img
                src={ch.image}
                alt=""
                className="w-full h-full object-cover"
                loading="eager"
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
