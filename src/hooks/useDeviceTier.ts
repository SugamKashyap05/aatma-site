import { useState, useEffect } from "react";

export type DeviceTier = "mobile" | "tablet" | "desktop";

const MOBILE_MAX = 767;
const TABLET_MAX = 1024;

/**
 * Returns the current device tier based on window width.
 * SSR-safe: defaults to "desktop" before mount, then re-evaluates on the client.
 * Updates on resize so components can react to orientation changes.
 */
export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("desktop");

  useEffect(() => {
    if (typeof window === "undefined") {
      setTier("desktop");
      return;
    }
    const check = (): void => {
      const w = window.innerWidth;
      setTier(w <= MOBILE_MAX ? "mobile" : w <= TABLET_MAX ? "tablet" : "desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return tier;
}
