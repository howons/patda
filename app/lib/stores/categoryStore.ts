import { CategoryDirection } from "@lib/types/property";
import { createStore } from "zustand/vanilla";

export type CategoryState = {
  direction: CategoryDirection;
  isActive: boolean;
};

export type CategoryActions = {
  updateDirection: (direction: CategoryDirection) => void;
  toggleActive: () => void;
};

export type CategoryStore = CategoryState & CategoryActions;

export const initCategoryStore = (): CategoryState => {
  return { direction: "up", isActive: false };
};

export const defaultInitState: CategoryState = {
  direction: "up",
  isActive: false,
};

export const createCategoryStore = (
  initState: CategoryState = defaultInitState
) => {
  return createStore<CategoryStore>()((set) => ({
    ...initState,
    updateDirection: (direction) => set((state) => ({ direction })),
    toggleActive: () => set((state) => ({ isActive: !state.isActive })),
  }));
};
