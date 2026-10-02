import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useDeviceTier } from "@/hooks/useDeviceTier";

interface PageTurnProps {
  children: React.ReactNode;
  pageKey: string;
  className?: string;
}

/**
 * Animated page transition wrapper.
 * Desktop: 3D rotateY page turn (300ms, compositor-only).
 * Mobile: slide-and-fade (250ms).
 * All animation gated behind usePrefersReducedMotion.
 */
export function PageTurn({ children, pageKey, className }: PageTurnProps) {
  const reducedMotion = usePrefersReducedMotion();
  const tier = useDeviceTier();
  const isMobile = tier === "mobile";

  const animClass = reducedMotion
    ? ""
    : isMobile
      ? "page-turn-slide"
      : "page-turn-3d";

  return (
    <div className={cn("page-turn-container", className)}>
      <div className={animClass} key={pageKey}>
        {children}
      </div>
    </div>
  );
}
