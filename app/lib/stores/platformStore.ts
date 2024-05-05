import { CategoryDirection, Platform } from "@lib/types/property";
import { createStore } from "zustand/vanilla";

export type PlatformState = {
  platform: Platform;
  direction: CategoryDirection;
};

export type PlatformActions = {
  updatePlatform: (platform: Platform) => void;
  updateDirection: (direction: CategoryDirection) => void;
};

export type PlatformStore = PlatformState & PlatformActions;

export const initPlatformStore = (
  platform: Platform = "daangn"
): PlatformState => {
  return { platform, direction: "up" };
};

export const defaultInitState: PlatformState = {
  platform: "daangn",
  direction: "up",
};

export const createPlatformStore = (
  initState: PlatformState = defaultInitState
) => {
  return createStore<PlatformStore>()((set) => ({
    ...initState,
    updatePlatform: (platform) => set((state) => ({ platform })),
    updateDirection: (direction) => set((state) => ({ direction })),
  }));
};
