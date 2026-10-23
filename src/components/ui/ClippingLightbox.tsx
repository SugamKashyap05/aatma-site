import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export interface ClippingLightboxProps {
  /** Controlled open state. */
  open: boolean;
  /** Resolved URL of the clipping scan (use assetUrl() for public assets). */
  src: string;
  /** Accessible description of the scan. */
  alt: string;
  /** Clipping headline, shown in the modal header. */
  title: string;
  /** Citation line: outlet, page, date, language. */
  meta: string;
  /** Close handler. */
  onClose: () => void;
}

/**
 * Accessible image lightbox for the newspaper clippings on /press.
 *
 * The clippings are photographs of newsprint — several in Bengali or Assamese
 * script — so the scan is the only faithful way to read them. This modal shows
 * the scan at full size instead of a transcription.
 *
 * Accessibility:
 *  - role="dialog" aria-modal="true"
 *  - Escape closes; backdrop click closes
 *  - Focus trapped while open, restored to the triggering element on close
 *  - Body scroll locked while open
 *  - Animations gated on prefers-reduced-motion
 */
export function ClippingLightbox({
  open,
  src,
  alt,
  title,
  meta,
  onClose,
}: ClippingLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Lock body scroll while the modal is open
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Restore focus to the triggering element on close
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
    }
    return () => {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    };
  }, [open]);

  // Focus the close button when the modal opens
  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }

      // Focus trap: keep Tab cycling within the dialog
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose],
  );

  if (!open) return null;

  const motionClasses = reducedMotion
    ? ""
    : "animate-[fadeIn_200ms_ease-out]";

  const overlayMotionClasses = reducedMotion
    ? ""
    : "animate-[fadeIn_150ms_ease-out]";

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      role="presentation"
    >
      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-green-deep/95 backdrop-blur-sm",
          overlayMotionClasses,
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Clipping: ${title}`}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative flex w-full max-w-5xl h-[88vh] flex-col overflow-hidden rounded-sm",
          "border border-glass-border bg-green-deep shadow-2xl",
          motionClasses,
        )}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-glass-border bg-glass-surface-subtle px-5 py-4">
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-display text-base font-bold leading-snug text-white md:text-lg">
              {title}
            </h2>
            {meta && (
              <p className="mt-1 text-xs text-cream/70 md:text-sm">{meta}</p>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm",
              "text-cream/85 hover:text-gold-light",
              "border border-glass-border hover:border-gold/30",
              "transition-colors duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light",
            )}
            aria-label="Close clipping"
          >
            <X size={20} aria-hidden="true" focusable="false" />
          </button>
        </div>

        {/* Enlarged clipping scan */}
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-black/40 p-4 md:p-6">
          <img
            src={src}
            alt={alt}
            className="max-h-full max-w-full object-contain"
            decoding="async"
          />
        </div>

        {/* Footer note */}
        <div className="flex shrink-0 items-center gap-2 border-t border-glass-border px-5 py-3 text-xs text-cream/60">
          <ZoomIn size={14} aria-hidden="true" focusable="false" />
          <span>
            The clipping is shown at full size. Scroll to read the whole page.
          </span>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ClippingLightbox;
