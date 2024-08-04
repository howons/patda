import { createStore } from "zustand/vanilla";

export type SearchState = {
  query: string;
};

export type SearchActions = {
  updateQuery: (query: string) => void;
};

export type SearchStore = SearchState & SearchActions;

export const initSearchStore = (query: string = ""): SearchState => {
  return { query };
};

export const defaultInitState: SearchState = {
  query: "",
};

export const createSearchStore = (
  initState: SearchState = defaultInitState
) => {
  return createStore<SearchStore>()((set) => ({
    ...initState,
    updateQuery: (query) => set((state) => ({ query })),
  }));
};
