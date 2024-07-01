"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";

import {
  createSearchStore,
  initSearchStore,
  type SearchStore,
} from "#lib/stores/searchStore.js";

export const SearchStoreContext = createContext<StoreApi<SearchStore> | null>(
  null
);

export interface SearchStoreProviderProps {
  defaultState?: string;
  children: ReactNode;
}

export const SearchStoreProvider = ({
  defaultState,
  children,
}: SearchStoreProviderProps) => {
  const storeRef = useRef<StoreApi<SearchStore>>();
  if (!storeRef.current) {
    storeRef.current = createSearchStore(initSearchStore(defaultState));
  }

  return (
    <SearchStoreContext.Provider value={storeRef.current}>
      {children}
    </SearchStoreContext.Provider>
  );
};

export const useSearchStore = <T,>(selector: (store: SearchStore) => T): T => {
  const searchStoreContext = useContext(SearchStoreContext);

  if (!searchStoreContext) {
    throw new Error(`useSearchStore must be use within SearchStoreProvider`);
  }

  return useStore(searchStoreContext, selector);
};
