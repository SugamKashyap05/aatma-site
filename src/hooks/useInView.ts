import { useState, useEffect, useRef, useCallback } from "react";

export function useInView(threshold = 0.1) {
  const elRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [visible, setVisible] = useState(false);
  const hasCheckedRef = useRef(false);

  const setRef = useCallback((node: HTMLElement | null) => {
    elRef.current = node;
  }, []);

  // Check visibility on scroll/resize — fires when element enters viewport
  useEffect(() => {
    if (!elRef.current) return;

    // Immediate check after browser paint (handles hash navigation)
    const check = () => {
      const el = elRef.current;
      if (!el || hasCheckedRef.current) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        const visibleRatio = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / rect.height));
        if (visibleRatio >= threshold) {
          hasCheckedRef.current = true;
          setVisible(true);
          return;
        }
      }
      // Schedule next check
      requestAnimationFrame(check);
    };

    let rafId = requestAnimationFrame(check);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasCheckedRef.current = true;
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(elRef.current);
    observerRef.current = observer;

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { ref: setRef, visible };
}
