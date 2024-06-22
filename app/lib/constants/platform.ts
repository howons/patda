import { Platform } from "#lib/types/property";

export const PLATFORM_ID: { [key: number]: Platform } = [
  "daangn",
  "bunjang",
  "joongna",
  "etc",
] as const;

export const PLATFORM_NAME: { [key in Platform]: string } = {
  daangn: "당근",
  bunjang: "번개장터",
  joongna: "중고나라",
  etc: "기타",
} as const;

export const TRANS_DURATION = 300;
