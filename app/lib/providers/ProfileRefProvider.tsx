"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";

import {
  createProfileRefStore,
  initProfileRefStore,
  type ProfileRefStore,
} from "#lib/stores/profileRefStore.js";

export const ProfileRefStoreContext =
  createContext<StoreApi<ProfileRefStore> | null>(null);

export interface ProfileRefStoreProviderProps {
  defaultState?: HTMLButtonElement | null;
  children: ReactNode;
}

export const ProfileRefStoreProvider = ({
  defaultState,
  children,
}: ProfileRefStoreProviderProps) => {
  const storeRef = useRef<StoreApi<ProfileRefStore>>();
  if (!storeRef.current) {
    storeRef.current = createProfileRefStore(initProfileRefStore(defaultState));
  }

  return (
    <ProfileRefStoreContext.Provider value={storeRef.current}>
      {children}
    </ProfileRefStoreContext.Provider>
  );
};

export const useProfileRefStore = <T,>(
  selector: (store: ProfileRefStore) => T
): T => {
  const profileRefStoreContext = useContext(ProfileRefStoreContext);

  if (!profileRefStoreContext) {
    throw new Error(
      `useProfileRefStore must be use within ProfileRefStoreProvider`
    );
  }

  return useStore(profileRefStoreContext, selector);
};
