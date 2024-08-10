import type { getComments } from "#lib/database/comments.js";
import type { getPost, getPostsByNickname } from "#lib/database/posts";

export type PostInfo =
  ReturnType<typeof getPost> extends Promise<infer T> ? T : never;

export type CommentInfo =
  ReturnType<typeof getComments> extends Promise<(infer T)[]> ? T : never;

export type TroublemakerInfo =
  ReturnType<typeof getPostsByNickname> extends Promise<(infer T)[]>
    ? T
    : never;
