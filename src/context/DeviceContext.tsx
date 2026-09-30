export type { DeviceTier } from "@/hooks/useDeviceTier";
import { createContext, useContext, type ReactNode } from "react";
import { useDeviceTier, type DeviceTier } from "@/hooks/useDeviceTier";

interface DeviceContextValue {
  tier: DeviceTier;
}

const DeviceContext = createContext<DeviceContextValue>({ tier: "desktop" });

export function DeviceProvider({ children }: { children: ReactNode }) {
  const tier = useDeviceTier();
  return <DeviceContext.Provider value={{ tier }}>{children}</DeviceContext.Provider>;
}

export function useDevice(): DeviceContextValue {
  return useContext(DeviceContext);
}
