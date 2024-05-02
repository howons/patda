"use client";

import {
  createPlatformStore,
  initPlatformStore,
  type PlatformStore,
} from "@lib/stores/platformStore";
import { createContext, type ReactNode, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";

import { Platform } from "@/types/property";

export const PlatformStoreContext =
  createContext<StoreApi<PlatformStore> | null>(null);

export interface PlatformStoreProviderProps {
  defaultState?: Platform;
  children: ReactNode;
}

export const PlatformStoreProvider = ({
  defaultState,
  children,
}: PlatformStoreProviderProps) => {
  const storeRef = useRef<StoreApi<PlatformStore>>();
  if (!storeRef.current) {
    storeRef.current = createPlatformStore(initPlatformStore(defaultState));
  }

  return (
    <PlatformStoreContext.Provider value={storeRef.current}>
      {children}
    </PlatformStoreContext.Provider>
  );
};

export const usePlatformStore = <T,>(
  selector: (store: PlatformStore) => T
): T => {
  const platformStoreContext = useContext(PlatformStoreContext);

  if (!platformStoreContext) {
    throw new Error(
      `usePlatformStore must be use within PlatformStoreProvider`
    );
  }

  return useStore(platformStoreContext, selector);
};
