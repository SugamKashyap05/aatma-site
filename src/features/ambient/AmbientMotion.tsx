// AmbientMotion — subtle floating cloud/fog layers for section backgrounds.
// Respects prefers-reduced-motion. Animates 1-2 elements per view max (skill guidance).
// Uses CSS @keyframes only — no JS animation, no layout thrashing.

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

interface AmbientMotionProps {
  /** How many cloud/fog layers to render (1-3) */
  layers?: 1 | 2 | 3;
  /** Visual style preset */
  variant?: "fog" | "clouds" | "particles";
  /** Background brightness: dark sections need lighter fog, light sections need darker */
  theme?: "dark" | "light" | "green";
  /** Additional class overrides */
  className?: string;
  /** Slowest drift speed (seconds per full cycle). Higher = slower, more serene. */
  speed?: number;
}

const DEFAULT_SPEED = 45; // seconds per full drift cycle — very slow, serene

// Fog: horizontal soft blurred ellipses that drift slowly sideways.
// Clouds: slightly more defined puff shapes that drift and bob.
// Particles: tiny dot specks that float upward gently.

function fogLayer({
  index,
  theme,
  speed,
  reduced,
}: {
  index: number;
  theme: string;
  speed: number;
  reduced: boolean;
}) {
  const baseDelay = index * 12; // stagger start times so layers don't sync
  const opacity = theme === "dark" ? 0.06 : theme === "green" ? 0.08 : 0.05;
  const blur = theme === "dark" ? "blur-3xl" : "blur-2xl";
  const color =
    theme === "dark"
      ? "bg-white"
      : theme === "green"
        ? "bg-green-light/20"
        : "bg-gold/20";

  return (
    <div
      className={cn(
        "absolute pointer-events-none transition-none",
        color,
        blur,
        "opacity-" + Math.round(opacity * 100),
        "w-96 h-48 rounded-full",
        reduced ? "style-none" : "style-float"
      )}
      style={{
        top: `${15 + index * 22 + (index % 2) * 10}%`,
        left: `${-5 + index * 30}%`,
        animationDuration: reduced ? "0s" : `${speed + index * 8}s`,
        animationDelay: reduced ? "0s" : `-${baseDelay}s`,
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
      }}
    />
  );
}

function cloudLayer({
  index,
  theme,
  speed,
  reduced,
}: {
  index: number;
  theme: string;
  speed: number;
  reduced: boolean;
}) {
  const baseDelay = index * 18;
  const opacity = theme === "dark" ? 0.04 : theme === "green" ? 0.06 : 0.03;
  const blur = "blur-xl";

  return (
    <div
      className={cn(
        "absolute pointer-events-none transition-none rounded-full",
        theme === "dark"
          ? "bg-white/20"
          : theme === "green"
            ? "bg-green-light/10"
            : "bg-gold/10",
        blur,
        "opacity-" + Math.round(opacity * 100),
        "w-72 h-36",
        reduced ? "style-none" : "style-cloud"
      )}
      style={{
        top: `${25 + index * 18}%`,
        left: `${10 + index * 25}%`,
        animationDuration: reduced ? "0s" : `${speed + index * 12}s`,
        animationDelay: reduced ? "0s" : `-${baseDelay}s`,
        animationIterationCount: "infinite",
        animationTimingFunction: "ease-in-out",
      }}
    />
  );
}

function particleLayer({
  index,
  theme,
  speed,
  reduced,
}: {
  index: number;
  theme: string;
  speed: number;
  reduced: boolean;
}) {
  // Generate 6-8 tiny specks per particle layer
  const specks = Array.from({ length: 8 }, (_, i) => ({
    id: `${index}-${i}`,
    top: `${(i * 13 + index * 7) % 90}%`,
    left: `${(i * 23 + index * 11) % 95}%`,
    size: 2 + (i % 3),
    delay: (i * 5 + index * 10) % 30,
  }));

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {specks.map((s) => (
        <div
          key={s.id}
          className={cn(
            "absolute rounded-full transition-none",
            theme === "dark"
              ? "bg-white/10"
              : theme === "green"
                ? "bg-green-light/15"
                : "bg-gold/10"
          )}
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            top: s.top,
            left: s.left,
            animationDuration: reduced ? "0s" : `${speed + s.delay}s`,
            animationDelay: reduced ? "0s" : `-${s.delay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
          }}
        />
      ))}
    </div>
  );
}

export function AmbientMotion({
  layers = 2,
  variant = "fog",
  theme = "dark",
  className,
  speed = DEFAULT_SPEED,
}: AmbientMotionProps) {
  const reduced = usePrefersReducedMotion();

  // When reduced motion is preferred, render a single static decorative element
  // (a soft gradient blob) instead of animated layers — still adds visual depth.
  if (reduced) {
    return (
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          theme === "dark"
            ? "bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.01]"
            : theme === "green"
              ? "bg-gradient-to-b from-green-light/[0.03] via-transparent to-green-light/[0.01]"
              : "bg-gradient-to-b from-gold/[0.02] via-transparent to-gold/[0.01]",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  const layerFn =
    variant === "particles" ? particleLayer : variant === "clouds" ? cloudLayer : fogLayer;

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden",
        variant === "particles" && "z-[-1]",
        variant === "fog" && "z-[-1]",
        variant === "clouds" && "z-[-1]",
        className
      )}
      aria-hidden="true"
    >
      {Array.from({ length: layers }, (_, i) =>
        layerFn({ index: i, theme, speed, reduced: false })
      )}
    </div>
  );
}
