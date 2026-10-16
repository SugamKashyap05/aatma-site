import * as React from "react";

/**
 * GamosaBorder — repeating red/gold/cream stripe divider inspired by the
 * Assamese gamosa textile pattern. Purely decorative; aria-hidden by default.
 *
 * Colours are driven by the `--color-gamosa-red` / `--color-mustard` /
 * `--color-cream` theme tokens, so the divider follows the design system
 * instead of hard-coding hex values (docs/DESIGN_SYSTEM.md §2, §5).
 */
function GamosaBorder({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        height: "8px",
        background: `repeating-linear-gradient(
          90deg,
          var(--color-gamosa-red) 0px,
          var(--color-gamosa-red) 12px,
          var(--color-cream) 12px,
          var(--color-cream) 14px,
          var(--color-mustard) 14px,
          var(--color-mustard) 20px,
          var(--color-cream) 20px,
          var(--color-cream) 22px,
          var(--color-gamosa-red) 22px,
          var(--color-gamosa-red) 34px,
          var(--color-cream) 34px,
          var(--color-cream) 36px
        )`,
      }}
    />
  );
}

export { GamosaBorder };
