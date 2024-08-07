import type { TroublemakerInfo } from "#lib/types/response.js";

export type SearchState = {
  status: "LOADING" | "SUCCESS" | "ERROR";
  troublemakers: TroublemakerInfo[];
};
