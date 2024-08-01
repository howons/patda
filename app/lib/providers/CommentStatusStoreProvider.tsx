"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";

import {
  type CommentStatusStore,
  createCommentStatusStore,
  initCommentStatusStore,
} from "#lib/stores/commentStatusStore.js";
import type { PostCommentStatus } from "#lib/types/property.js";

export const CommentStatusStoreContext =
  createContext<StoreApi<CommentStatusStore> | null>(null);

export interface CommentStatusStoreProviderProps {
  defaultState?: PostCommentStatus;
  children: ReactNode;
}

export const CommentStatusStoreProvider = ({
  defaultState,
  children,
}: CommentStatusStoreProviderProps) => {
  const storeRef = useRef<StoreApi<CommentStatusStore>>();
  if (!storeRef.current) {
    storeRef.current = createCommentStatusStore(
      initCommentStatusStore(defaultState)
    );
  }

  return (
    <CommentStatusStoreContext.Provider value={storeRef.current}>
      {children}
    </CommentStatusStoreContext.Provider>
  );
};

export const useCommentStatusStore = <T,>(
  selector: (store: CommentStatusStore) => T
): T => {
  const commentStatusStoreContext = useContext(CommentStatusStoreContext);

  if (!commentStatusStoreContext) {
    throw new Error(
      `useCommentStatusStore must be use within CommentStatusStoreProvider`
    );
  }

  return useStore(commentStatusStoreContext, selector);
};
