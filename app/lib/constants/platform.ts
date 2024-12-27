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
} as const;

export const PLATFORM_PLACEHOLDER: { [key in Platform]: string } = {
  daangn: "동네 이름",
  bunjang: "오늘 기준 오픈일",
  joongna: "네이버 아이디",
  etc: "기타 추가 정보",
} as const;
