import { Platform } from "@lib/types/property";

export type TroublemakerInfo = {
  id: number;
  nickname: string;
  platform: Platform;
  additionalUserInfo: string;
  image: string;
  postCount: number;
};
