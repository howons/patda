"use client";

import {
  type CategoryStore,
  createCategoryStore,
  initCategoryStore,
} from "@lib/stores/categoryStore";
import { createContext, type ReactNode, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";

export const CategoryStoreContext =
  createContext<StoreApi<CategoryStore> | null>(null);

export interface CategoryStoreProviderProps {
  children: ReactNode;
}

export const CategoryStoreProvider = ({
  children,
}: CategoryStoreProviderProps) => {
  const storeRef = useRef<StoreApi<CategoryStore>>();
  if (!storeRef.current) {
    storeRef.current = createCategoryStore(initCategoryStore());
  }

  return (
    <CategoryStoreContext.Provider value={storeRef.current}>
      {children}
    </CategoryStoreContext.Provider>
  );
};

export const useCategoryStore = <T,>(
  selector: (store: CategoryStore) => T
): T => {
  const categoryStoreContext = useContext(CategoryStoreContext);

  if (!categoryStoreContext) {
    throw new Error(
      `useCategoryStore must be use within CategoryStoreProvider`
    );
  }

  return useStore(categoryStoreContext, selector);
};
