import { createStore } from "zustand/vanilla";

import { Platform } from "@/types/property";

export type PlatformState = {
  platform: Platform;
};

export type PlatformActions = {
  updatePlatform: (platform: Platform) => void;
};

export type PlatformStore = PlatformState & PlatformActions;

export const initPlatformStore = (
  platform: Platform = "daangn"
): PlatformState => {
  return { platform };
};

export const defaultInitState: PlatformState = {
  platform: "daangn",
};

export const createPlatformStore = (
  initState: PlatformState = defaultInitState
) => {
  return createStore<PlatformStore>()((set) => ({
    ...initState,
    updatePlatform: (platform) => set((state) => ({ platform: platform })),
  }));
};
