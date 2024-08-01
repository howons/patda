import { createStore } from "zustand/vanilla";

export type ProfileRefState = {
  profileRef: HTMLButtonElement | null;
};

export type ProfileRefActions = {
  updateProfileRef: (profileRef: HTMLButtonElement | null) => void;
};

export type ProfileRefStore = ProfileRefState & ProfileRefActions;

export const initProfileRefStore = (
  profileRef: HTMLButtonElement | null = null
): ProfileRefState => {
  return { profileRef };
};

export const defaultInitState: ProfileRefState = {
  profileRef: null,
};

export const createProfileRefStore = (
  initState: ProfileRefState = defaultInitState
) => {
  return createStore<ProfileRefStore>()((set) => ({
    ...initState,
    updateProfileRef: (profileRef) => set((state) => ({ profileRef })),
  }));
};
