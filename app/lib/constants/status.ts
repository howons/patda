import type { PostCommentStatus } from "#lib/types/property.js";

export const postCommentStatus: PostCommentStatus[] = [
  "normal",
  "debate",
  "deleted",
] as const;
