import { useState, useEffect, useCallback, useRef } from "react";
import type { Book, Chapter } from "@/data/books";

export type FontSize = "sm" | "md" | "lg" | "xl";

const FONT_SIZE_MAP: Record<FontSize, string> = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-2xl",
};

const FONT_SIZE_LABEL: Record<FontSize, string> = {
  sm: "A",
  md: "A+",
  lg: "A++",
  xl: "A+++",
};

const FONT_SIZE_ORDER: FontSize[] = ["sm", "md", "lg", "xl"];

const FONT_SIZE_STORAGE_KEY = "aatma-reader-font-size";
const DARK_MODE_STORAGE_KEY = "aatma-reader-dark-mode";

function readFontSize(): FontSize {
  if (typeof window === "undefined") return "md";
  const saved = localStorage.getItem(FONT_SIZE_STORAGE_KEY);
  if (saved && FONT_SIZE_ORDER.includes(saved as FontSize)) {
    return saved as FontSize;
  }
  return "md";
}

function readDarkMode(): boolean {
  if (typeof window === "undefined") return true;
  const saved = localStorage.getItem(DARK_MODE_STORAGE_KEY);
  return saved === null ? true : saved === "true";
}

export interface UseBookReaderReturn {
  book: Book | null;
  chapter: Chapter | null;
  chapterIndex: number;
  fontSize: FontSize;
  darkMode: boolean;
  progress: number;
  tocOpen: boolean;
  readingRef: React.RefObject<HTMLDivElement | null>;
  setBook: (book: Book | null) => void;
  goToChapter: (index: number) => void;
  nextChapter: () => void;
  prevChapter: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  toggleToc: () => void;
  closeToc: () => void;
  toggleDarkMode: () => void;
  downloadBook: () => void;
}

export function useBookReader(initialBook: Book | null = null): UseBookReaderReturn {
  const [book, setBookState] = useState<Book | null>(initialBook);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState<FontSize>(readFontSize);
  const [darkMode, setDarkMode] = useState<boolean>(readDarkMode);
  const [progress, setProgress] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const readingRef = useRef<HTMLDivElement | null>(null);

  const chapter = book ? book.chapters[chapterIndex] ?? null : null;

  const setBook = useCallback((b: Book | null) => {
    setBookState(b);
    setChapterIndex(0);
    setProgress(0);
    setTocOpen(false);
  }, []);

  const goToChapter = useCallback(
    (index: number) => {
      if (!book) return;
      const clamped = Math.max(0, Math.min(book.chapters.length - 1, index));
      setChapterIndex(clamped);
      setProgress(0);
      setTocOpen(false);
      // Scroll reading area to top
      if (readingRef.current) {
        readingRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [book]
  );

  const nextChapter = useCallback(() => {
    if (!book) return;
    if (chapterIndex < book.chapters.length - 1) {
      goToChapter(chapterIndex + 1);
    }
  }, [book, chapterIndex, goToChapter]);

  const prevChapter = useCallback(() => {
    if (chapterIndex > 0) {
      goToChapter(chapterIndex - 1);
    }
  }, [chapterIndex, goToChapter]);

  const increaseFontSize = useCallback(() => {
    setFontSize((prev) => {
      const idx = FONT_SIZE_ORDER.indexOf(prev);
      return FONT_SIZE_ORDER[Math.min(idx + 1, FONT_SIZE_ORDER.length - 1)];
    });
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSize((prev) => {
      const idx = FONT_SIZE_ORDER.indexOf(prev);
      return FONT_SIZE_ORDER[Math.max(idx - 1, 0)];
    });
  }, []);

  const toggleToc = useCallback(() => setTocOpen((o) => !o), []);
  const closeToc = useCallback(() => setTocOpen(false), []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem(DARK_MODE_STORAGE_KEY, String(next));
      }
      return next;
    });
  }, []);

  const downloadBook = useCallback(() => {
    if (!book) return;
    // If an external download URL is available, use it directly
    if (book.externalDownloadUrl) {
      const a = document.createElement("a");
      a.href = book.externalDownloadUrl;
      a.download = `${book.slug}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    const content = [
      `${book.title}`,
      `by ${book.author}`,
      "",
      book.description,
      "",
      ...book.chapters.flatMap((ch) => [
        "",
        `${ch.title}${ch.subtitle ? ` — ${ch.subtitle}` : ""}`,
        "",
        ...ch.body,
      ]),
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${book.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [book]);

  // Persist font size to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(FONT_SIZE_STORAGE_KEY, fontSize);
    }
  }, [fontSize]);

  // Scroll progress tracking
  useEffect(() => {
    if (!readingRef.current) return;
    const el = readingRef.current;
    let rafId: number;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const passed = -rect.top;
      const p = total > 0 ? Math.max(0, Math.min(1, passed / total)) : 0;
      setProgress(p);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [chapterIndex, book]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        nextChapter();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prevChapter();
      } else if (e.key === "Escape") {
        setTocOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [nextChapter, prevChapter]);

  return {
    book,
    chapter,
    chapterIndex,
    fontSize,
    darkMode,
    progress,
    tocOpen,
    readingRef,
    setBook,
    goToChapter,
    nextChapter,
    prevChapter,
    increaseFontSize,
    decreaseFontSize,
    toggleToc,
    closeToc,
    toggleDarkMode,
    downloadBook,
  };
}

export { FONT_SIZE_MAP, FONT_SIZE_LABEL };
