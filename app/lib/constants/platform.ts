import type { FormColor, Platform } from "#lib/types/property.js";

export const PLATFORM_SET = new Set(["daangn", "bunjang", "joongna", "etc"]);

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

export const PLATFORM_COLOR: { [key in Platform]: FormColor } = {
  daangn: "orange",
  bunjang: "red",
  joongna: "green",
  etc: "zinc",
};
