import type { Platform } from "#lib/types/property.js";

export type TroublemakerInfo = {
  id: number;
  nickname: string;
  platform: Platform;
  additionalUserInfo: string;
  image: string;
  postCount: number;
};
