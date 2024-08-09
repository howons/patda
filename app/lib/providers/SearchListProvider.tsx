"use client";

import {
  createContext,
  type KeyboardEventHandler,
  type ReactNode,
  type RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import { useSearchStore } from "#lib/providers/SearchStoreProvider.jsx";
import type { TroublemakerInfo } from "#lib/types/response.js";
import type { SearchState } from "#lib/types/state.js";

const DEBOUNCE_INTERVAL = 200;

const SearchListContext = createContext<{
  activeItemIdx: number;
  searchListRef: RefObject<HTMLUListElement | HTMLOListElement>;
  troublemakersStatus: SearchState;
  handleInputKeyDown: KeyboardEventHandler<HTMLDivElement>;
} | null>(null);

interface SearchListProviderProps {
  children: ReactNode;
}

export const SearchListProvider = ({ children }: SearchListProviderProps) => {
  const searchListRef = useRef<HTMLUListElement | HTMLOListElement>(null);

  const [troublemakersStatus, setTroublemakersStatus] = useState<SearchState>({
    status: "LOADING",
    troublemakers: [],
    otherPlatformTroublemakers: [],
  });
  const [activeItemIdx, setActiveItemIdx] = useState(0);
  const query = useSearchStore((state) => state.query);
  const platform = usePlatformStore((state) => state.platform);

  const handleInputKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!searchListRef.current) return;

    const listItems = searchListRef.current.querySelectorAll("li");
    const listLength = listItems.length;

    if (e.key === "ArrowUp") {
      setActiveItemIdx((idx) => (idx > 0 ? idx - 1 : idx));
    } else if (e.key === "ArrowDown") {
      setActiveItemIdx((idx) => (idx < listLength - 1 ? idx + 1 : idx));
    } else if (e.key === "Enter" && listItems && activeItemIdx >= 0) {
      listItems[activeItemIdx].click();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        setTroublemakersStatus(({ status, ...rest }) => ({
          status: "LOADING",
          ...rest,
        }));
        const response = await fetch(`/api/v1/posts?nickname=${query}`);
        const posts = (await response.json()) as TroublemakerInfo[];
        setTroublemakersStatus({
          status: "SUCCESS",
          troublemakers: posts.filter((post) => post.platform === platform),
          otherPlatformTroublemakers: posts.filter(
            (post) => post.platform !== platform
          ),
        });
      } catch (err) {
        setTroublemakersStatus(({ status, ...rest }) => ({
          status: "ERROR",
          ...rest,
        }));
      }

      setActiveItemIdx(-1);
    }, DEBOUNCE_INTERVAL);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [platform, query]);

  const value = {
    activeItemIdx,
    searchListRef,
    troublemakersStatus,
    handleInputKeyDown,
  };

  return (
    <SearchListContext.Provider value={value}>
      {children}
    </SearchListContext.Provider>
  );
};

export const useSearchListContext = () => {
  const searchListContext = useContext(SearchListContext);

  if (!searchListContext) {
    throw new Error(
      `useSearchListContext must be use within SearchListProvider`
    );
  }

  return searchListContext;
};
