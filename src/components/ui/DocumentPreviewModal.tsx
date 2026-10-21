import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Download, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export interface DocumentPreviewModalProps {
  /** Controlled open state. */
  open: boolean;
  /** Document title shown in the modal header. */
  title: string;
  /** Resolved URL for the PDF (use assetUrl() for public assets). */
  pdfUrl: string;
  /** Suggested filename for the download action. */
  fileName?: string;
  /** Secondary metadata line (date, page count, source, etc.). */
  meta?: string;
  /** Close handler. */
  onClose: () => void;
}

/**
 * Shared accessible document preview modal.
 *
 * Opens the browser's native PDF viewer inside an <iframe> so visitors can
 * scroll and zoom without downloading. The download action remains available
 * as a secondary button.
 *
 * Accessibility:
 *  - role="dialog" aria-modal="true"
 *  - Escape key closes
 *  - Focus trapped while open, restored to the triggering element on close
 *  - Body scroll locked while open
 *  - Animations gated on prefers-reduced-motion
 */
export function DocumentPreviewModal({
  open,
  title,
  pdfUrl,
  fileName,
  meta,
  onClose,
}: DocumentPreviewModalProps) {
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

  // Restore focus to the triggering element on unmount/close
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

  // Handle Escape key
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }

      // Simple focus trap: keep Tab cycling within the dialog
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], iframe, [tabindex]:not([tabindex="-1"])'
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
        aria-label={`Preview: ${title}`}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative w-full max-w-5xl h-[85vh] flex flex-col rounded-sm overflow-hidden",
          "bg-green-deep border border-glass-border shadow-2xl",
          motionClasses,
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-glass-border bg-glass-surface-subtle shrink-0">
          <div className="min-w-0 flex-1">
            <h2 className="font-display font-bold text-white text-base md:text-lg leading-snug truncate">
              {title}
            </h2>
            {meta && (
              <p className="mt-1 text-cream/70 text-xs md:text-sm">{meta}</p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={pdfUrl}
              download={fileName ?? title}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-sm",
                "text-sm font-medium text-cream/85 hover:text-gold-light",
                "border border-glass-border hover:border-gold/30",
                "transition-colors duration-200",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light",
              )}
              aria-label={`Download ${title}`}
            >
              <Download size={16} aria-hidden="true" focusable="false" />
              <span className="hidden sm:inline">Download</span>
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className={cn(
                "inline-flex items-center justify-center w-11 h-11 rounded-sm",
                "text-cream/85 hover:text-gold-light",
                "border border-glass-border hover:border-gold/30",
                "transition-colors duration-200",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light",
              )}
              aria-label="Close preview"
            >
              <X size={20} aria-hidden="true" focusable="false" />
            </button>
          </div>
        </div>

        {/* PDF iframe — browser native viewer */}
        <div className="flex-1 min-h-0 bg-white">
          <iframe
            src={pdfUrl}
            title={`PDF preview: ${title}`}
            className="w-full h-full border-0"
            allow="clipboard-write"
          >
            <p className="p-6 text-charcoal text-sm">
              Your browser does not support inline PDF previews.{" "}
              <a
                href={pdfUrl}
                download={fileName ?? title}
                className="text-gold-deep underline"
              >
                Download the document
              </a>{" "}
              to view it.
            </p>
          </iframe>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default DocumentPreviewModal;
