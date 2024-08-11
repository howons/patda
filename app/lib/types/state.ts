import type { TroublemakerInfo } from "#lib/types/response.js";

export type SearchState = {
  status: "LOADING" | "LOADING_MORE" | "READY" | "END" | "ERROR";
  troublemakers: TroublemakerInfo[];
};
