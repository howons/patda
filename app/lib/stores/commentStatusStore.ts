import { createStore } from "zustand/vanilla";

import type { PostCommentStatus } from "#lib/types/property.js";

export type CommentStatusState = {
  commentStatus: PostCommentStatus;
};

export type CommentStatusActions = {
  updateCommentStatus: (commentStatus: PostCommentStatus) => void;
};

export type CommentStatusStore = CommentStatusState & CommentStatusActions;

export const initCommentStatusStore = (
  commentStatus: PostCommentStatus = "normal"
): CommentStatusState => {
  return { commentStatus };
};

export const defaultInitState: CommentStatusState = {
  commentStatus: "normal",
};

export const createCommentStatusStore = (
  initState: CommentStatusState = defaultInitState
) => {
  return createStore<CommentStatusStore>()((set) => ({
    ...initState,
    updateCommentStatus: (commentStatus) => set((state) => ({ commentStatus })),
  }));
};
