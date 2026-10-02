import { ArrowLeft, List, Download, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FontSize } from "@/hooks/useBookReader";
import { FONT_SIZE_LABEL } from "@/hooks/useBookReader";

interface ReaderTopBarProps {
  title: string;
  fontSize: FontSize;
  darkMode: boolean;
  onBack: () => void;
  onToggleToc: () => void;
  onIncreaseFont: () => void;
  onDecreaseFont: () => void;
  onToggleDarkMode: () => void;
  onDownload: () => void;
}

export function ReaderTopBar({
  title,
  fontSize,
  darkMode,
  onBack,
  onToggleToc,
  onIncreaseFont,
  onDecreaseFont,
  onToggleDarkMode,
  onDownload,
}: ReaderTopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-green-deep/95 backdrop-blur-md border-b border-white/10" role="navigation" aria-label="Reader controls">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-gold transition-colors duration-200 text-sm font-medium min-h-[44px] px-2"
          aria-label="Back to books"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Books</span>
        </button>

        <h1 className="font-display text-sm md:text-base text-white truncate flex-1 text-center">
          {title}
        </h1>

        <div className="flex items-center gap-1">
          <button
            onClick={onDecreaseFont}
            className="text-white/60 hover:text-gold transition-colors duration-200 p-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Decrease font size"
            title="Decrease font size"
          >
            <span className="text-xs font-bold">A-</span>
          </button>
          <span className="text-gold text-xs font-semibold min-w-[2rem] text-center" aria-hidden="true">
            {FONT_SIZE_LABEL[fontSize]}
          </span>
          <button
            onClick={onIncreaseFont}
            className="text-white/60 hover:text-gold transition-colors duration-200 p-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Increase font size"
            title="Increase font size"
          >
            <span className="text-sm font-bold">A+</span>
          </button>

          <div className="w-px h-5 bg-white/15 mx-1" />

          <button
            onClick={onToggleDarkMode}
            className="text-white/60 hover:text-gold transition-colors duration-200 p-1.5"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={onToggleToc}
            className="text-white/60 hover:text-gold transition-colors duration-200 p-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Table of contents"
            title="Table of contents"
          >
            <List size={18} />
          </button>
          <button
            onClick={onDownload}
            className="text-white/60 hover:text-gold transition-colors duration-200 p-1.5 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Download book"
            title="Download book"
          >
            <Download size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
