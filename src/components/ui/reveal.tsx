import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// ─── Types ────────────────────────────────────────────────────────────────────

type RevealVariant = "up" | "left" | "right" | "scale" | "fade";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  /**
   * rootMargin for the IntersectionObserver. Default shrinks the bottom edge
   * so the reveal fires when the element is ~40px into view. For wrappers
   * around `loading="lazy"` images, pass a positive bottom margin (e.g.
   * "0px 0px 300px 0px") so the wrapper reaches opacity:1 BEFORE the
   * browser's own lazy-load threshold — otherwise the browser treats the
   * still-invisible (opacity:0) image as not-visible and defers it forever.
   */
  rootMargin?: string;
}

// ─── Variant classes ──────────────────────────────────────────────────────────

const VARIANT_HIDDEN: Record<RevealVariant, string> = {
  up: "opacity-0 translate-y-6",
  left: "opacity-0 -translate-x-10",
  right: "opacity-0 translate-x-10",
  scale: "opacity-0 scale-95",
  fade: "opacity-0",
};

const VARIANT_VISIBLE: Record<RevealVariant, string> = {
  up: "opacity-100 translate-y-0",
  left: "opacity-100 translate-x-0",
  right: "opacity-100 translate-x-0",
  scale: "opacity-100 scale-100",
  fade: "opacity-100",
};

// ─── Reveal component ─────────────────────────────────────────────────────────

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 700,
  className,
  threshold = 0.05,
  rootMargin = "0px 0px -40px 0px",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, threshold, rootMargin]);

  // For reduced motion, render without animation classes
  if (reduced) {
    return (
      <div ref={ref} className={cn("transition-none", className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        // will-change only while visible/animating. Applying it in the hidden
        // state promotes the (transformed, off-screen) element to its own
        // compositing layer, and Chrome's lazy-loading defers images inside a
        // will-change:transform ancestor that hasn't entered view yet — the
        // root cause of naturalWidth:0 on lazy images wrapped in Reveal.
        visible && "will-change-transform",
        visible ? VARIANT_VISIBLE[variant] : VARIANT_HIDDEN[variant],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Stagger container ────────────────────────────────────────────────────────

interface StaggerProps {
  children: ReactNode;
  staggerMs?: number;
  className?: string;
  threshold?: number;
}

export function Stagger({
  children,
  staggerMs = 100,
  className,
  threshold = 0.1,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, threshold]);

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              className={cn(
                "transition-all ease-out will-change-transform",
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{
                transitionDuration: "600ms",
                transitionDelay: visible ? `${i * staggerMs}ms` : "0ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
