import type { getPost } from "#lib/database/posts";
import type { Platform } from "#lib/types/property.js";

export type PostInfo =
  ReturnType<typeof getPost> extends Promise<infer T> ? T : never;

export type TroublemakerInfo = {
  id: number;
  nickname: string;
  platform: Platform;
  additionalUserInfo: string;
  image: string;
  postCount: number;
};
