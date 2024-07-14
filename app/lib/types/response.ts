import type { Database } from "#lib/database/db.js";
import type { Platform } from "#lib/types/property.js";

export type PostInfo = Database["Post"];

export type TroublemakerInfo = {
  id: number;
  nickname: string;
  platform: Platform;
  additionalUserInfo: string;
  image: string;
  postCount: number;
};
