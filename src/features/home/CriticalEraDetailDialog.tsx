import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import type { CriticalEraCard } from "@/data/critical-era";

interface CriticalEraDetailDialogProps {
  card: CriticalEraCard;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

/** Displays the complete client-sourced detail for one Critical Era card. */
export function CriticalEraDetailDialog({
  card,
  onClose,
}: CriticalEraDetailDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const appRoot = document.getElementById("root");
    const previouslyInert = appRoot?.inert ?? false;

    document.body.style.overflow = "hidden";
    if (appRoot) appRoot.inert = true;

    // Long, structured content should begin at its heading, not be announced as one description.
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6" role="presentation">
      <div
        className="absolute inset-0 bg-green-deep/90 backdrop-blur-sm"
        data-critical-era-backdrop
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        id="critical-era-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="critical-era-dialog-title"
        className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-border bg-cream text-text shadow-2xl sm:max-h-[calc(100dvh-3rem)]"
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-border bg-cream-dark px-5 py-4 sm:px-7">
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-sm font-semibold tracking-wide text-gold-deep">
              Critical Era · {card.year}
            </p>
            <h2
              ref={titleRef}
              id="critical-era-dialog-title"
              tabIndex={-1}
              className="font-display text-xl font-bold leading-snug text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep sm:text-2xl"
            >
              {card.title}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close critical era details"
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg border border-border text-charcoal transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
            onClick={onClose}
          >
            <X size={20} aria-hidden="true" focusable="false" />
          </button>
        </header>

        <div
          data-critical-era-dialog-content
          role="document"
          aria-label={`${card.title} details`}
          tabIndex={0}
          className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-6 text-base leading-relaxed text-text focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold-deep sm:px-7 sm:py-8 sm:text-lg"
        >
          {card.detailParagraphs.map((paragraph, index) => (
            <p key={`${card.id}-detail-${index}`}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
