import type { getComments } from "#lib/database/comments.js";
import type { getPost, getPostsByNicknamePlatform } from "#lib/database/posts";

export type PostInfo =
  ReturnType<typeof getPost> extends Promise<infer T> ? T : never;

export type CommentInfo =
  ReturnType<typeof getComments> extends Promise<(infer T)[]> ? T : never;

export type TroublemakerInfo =
  ReturnType<typeof getPostsByNicknamePlatform> extends Promise<(infer T)[]>
    ? T
    : never;

export type InfinitePostsInfo = {
  data: TroublemakerInfo[];
  nextCursor: number;
};
