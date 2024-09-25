"use client";

import {
  createContext,
  type MutableRefObject,
  type PropsWithChildren,
  useContext,
  useRef,
} from "react";

export const ProfileRefContext = createContext<
  MutableRefObject<HTMLButtonElement | null>
>({ current: null });

export const ProfileRefProvider = ({ children }: PropsWithChildren<{}>) => {
  const profileRef = useRef<HTMLButtonElement | null>(null);

  return (
    <ProfileRefContext.Provider value={profileRef}>
      {children}
    </ProfileRefContext.Provider>
  );
};

export const useProfileRef = () => {
  const profileRefContext = useContext(ProfileRefContext);

  if (!profileRefContext) {
    throw new Error(`useProfileRef must be use within ProfileRefProvider`);
  }

  return profileRefContext;
};
