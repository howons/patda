import { TroublemakerInfo } from "@lib/types/response";
import { createStore } from "zustand/vanilla";

export type SearchState = {
  query: string;
  searchResults: TroublemakerInfo[];
};

export type SearchActions = {
  updateQuery: (query: string) => void;
};

export type SearchStore = SearchState & SearchActions;

export const initSearchStore = (query: string = ""): SearchState => {
  return { query, searchResults: [] };
};

export const defaultInitState: SearchState = {
  query: "",
  searchResults: [],
};

export const createSearchStore = (
  initState: SearchState = defaultInitState
) => {
  return createStore<SearchStore>()((set) => ({
    ...initState,
    updateQuery: (query) => set((state) => ({ query })),
  }));
};
