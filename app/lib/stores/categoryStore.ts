import { CategoryDirection, Platform } from "@lib/types/property";
import { createStore } from "zustand/vanilla";

export type CategoryState = {
  direction: CategoryDirection;
};

export type CategoryActions = {
  updateDirection: (direction: CategoryDirection) => void;
};

export type CategoryStore = CategoryState & CategoryActions;

export const initCategoryStore = (): CategoryState => {
  return { direction: "up" };
};

export const defaultInitState: CategoryState = {
  direction: "up",
};

export const createCategoryStore = (
  initState: CategoryState = defaultInitState
) => {
  return createStore<CategoryStore>()((set) => ({
    ...initState,
    updateDirection: (direction) => set((state) => ({ direction })),
  }));
};
