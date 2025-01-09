"use client";

import { createContext, type PropsWithChildren, useContext } from "react";

import type { CommentInfo } from "#lib/types/response.js";

interface CommentValue
  extends Omit<
    CommentInfo,
    | "userId"
    | "daangnNickname"
    | "bunjangNickname"
    | "joongnaNickname"
    | "etcNickname"
  > {
  nickname: string | null;
}

const CommentContext = createContext<CommentValue | null>(null);

interface CommentProviderProps
  extends Omit<
    CommentInfo,
    | "userId"
    | "daangnNickname"
    | "bunjangNickname"
    | "joongnaNickname"
    | "etcNickname"
  > {
  nickname: string | null;
}

export const CommentProvider = ({
  children,
  ...props
}: PropsWithChildren<CommentProviderProps>) => {
  return (
    <CommentContext.Provider value={props}>{children}</CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  const commentContext = useContext(CommentContext);

  if (!commentContext) {
    throw new Error(`useCommentContext must be use within CommentProvider`);
  }

  return commentContext;
};
