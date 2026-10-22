import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import type { AboutStoryItem } from "@/data/about-stories";

interface AboutStoryDialogProps {
  item: AboutStoryItem;
  index: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

export function AboutStoryDialog({
  item,
  index,
  total,
  onClose,
  onPrevious,
  onNext,
}: AboutStoryDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [index]);

  useEffect(() => {
    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const appRoot = document.getElementById("root");
    const previouslyInert = appRoot?.inert ?? false;

    document.body.style.overflow = "hidden";
    if (appRoot) appRoot.inert = true;
    titleRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute("disabled"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!first || !last) {
        event.preventDefault();
        titleRef.current?.focus();
      } else if (
        event.shiftKey &&
        (active === first || active === titleRef.current || !dialogRef.current.contains(active))
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !dialogRef.current.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (appRoot) appRoot.inert = previouslyInert;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
      role="presentation"
      data-about-story-dialog-root
    >
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-default bg-green-deep/90 backdrop-blur-sm"
        aria-label="Close story details"
        data-about-story-backdrop
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-story-dialog-title"
        data-about-story-dialog
        data-about-story-index={index}
        className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-white/15 bg-green-deep text-agar-body shadow-2xl sm:max-h-[calc(100dvh-3rem)]"
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-sm font-semibold tracking-wide text-agar-label">
              {item.eyebrow} · {index + 1} of {total}
            </p>
            <h2
              ref={titleRef}
              id="about-story-dialog-title"
              tabIndex={-1}
              className="font-display text-xl font-bold leading-snug text-agar-title focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:text-2xl"
            >
              {item.title}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close story details"
            data-about-story-close
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg border border-white/20 text-agar-title transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            onClick={onClose}
          >
            <X size={20} aria-hidden="true" focusable="false" />
          </button>
        </header>

        <div
          ref={contentRef}
          role="document"
          aria-label={`${item.title} details`}
          tabIndex={0}
          data-about-story-content
          className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-6 text-base leading-relaxed text-agar-body focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold sm:px-7 sm:py-8 sm:text-lg"
        >
          {item.detailParagraphs.map((paragraph, paragraphIndex) => (
            <p key={`${item.id}-detail-${paragraphIndex}`} data-about-source-paragraph>
              {paragraph}
            </p>
          ))}
          {item.author && item.role && (
            <footer className="border-t border-white/10 pt-5" data-about-story-byline>
              <p className="font-display font-semibold text-agar-title">{item.author}</p>
              <p className="text-sm text-agar-label">{item.role}</p>
            </footer>
          )}
        </div>

        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 px-5 py-4 sm:px-7">
          <button
            type="button"
            data-about-story-previous
            disabled={index === 0}
            onClick={onPrevious}
            className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-white/20 px-3 text-sm font-semibold text-agar-label transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <ArrowLeft size={16} aria-hidden="true" focusable="false" />
            Previous
          </button>
          <span className="text-xs tabular-nums text-agar-label" aria-live="polite">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            data-about-story-next
            disabled={index === total - 1}
            onClick={onNext}
            className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-white/20 px-3 text-sm font-semibold text-agar-label transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Next
            <ArrowRight size={16} aria-hidden="true" focusable="false" />
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}