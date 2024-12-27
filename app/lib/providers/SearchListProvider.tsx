"use client";

import {
  createContext,
  type KeyboardEventHandler,
  type ReactNode,
  type RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import useInfiniteSearch from "#lib/hooks/useInfiniteSearch.js";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import { useSearchStore } from "#lib/providers/SearchStoreProvider.jsx";
import type { SearchState } from "#lib/types/state.js";

interface SearchListValue {
  activeItemIdx: number;
  searchListRef: RefObject<HTMLUListElement | HTMLOListElement>;
  troublemakersState: SearchState;
  othersState: SearchState;
  handleInputKeyDown: KeyboardEventHandler<HTMLDivElement>;
  handleMoreClick: (isExclude?: boolean) => () => void;
}

const SearchListContext = createContext<SearchListValue | null>(null);

interface SearchListProviderProps {
  children: ReactNode;
}

export const SearchListProvider = ({ children }: SearchListProviderProps) => {
  const searchListRef = useRef<HTMLUListElement | HTMLOListElement>(null);
  const [activeItemIdx, setActiveItemIdx] = useState(0);

  useEffect(() => {
    if (!searchListRef.current) return;

    scrollToActiveItem(
      searchListRef.current.querySelectorAll("li")[activeItemIdx]
    );
  }, [activeItemIdx]);

  const query = useSearchStore((state) => state.query);
  const platform = usePlatformStore((state) => state.platform);
  const queryKeyValues = useMemo(
    () => ({
      nickname: query,
      platform,
    }),
    [platform, query]
  );
  const queryKeyValuesWithExclude = useMemo(
    () => ({
      nickname: query,
      platform,
      exclude: "1",
    }),
    [platform, query]
  );

  const handleQueryKeyChange = useCallback(() => setActiveItemIdx(-1), []);
  const {
    state: troublemakersState,
    size: troublemakersSize,
    setSize: setTroublemakersSize,
  } = useInfiniteSearch({
    url: "/api/v1/posts",
    queryKeyValues,
    onChange: handleQueryKeyChange,
  });
  const {
    state: othersState,
    size: othersSize,
    setSize: setOthersSize,
  } = useInfiniteSearch({
    url: "/api/v1/posts",
    queryKeyValues: queryKeyValuesWithExclude,
    onChange: handleQueryKeyChange,
  });

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

  const handleMoreClick = (isExclude?: boolean) => () => {
    if (isExclude) {
      setOthersSize(othersSize + 1);
    } else {
      setTroublemakersSize(troublemakersSize + 1);
    }
  };

  const value: SearchListValue = {
    activeItemIdx,
    searchListRef,
    troublemakersState,
    othersState,
    handleInputKeyDown,
    handleMoreClick,
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

const HEADER_HEIGHT = 56;

function scrollToActiveItem(item: HTMLLIElement) {
  if (typeof window === "undefined" || !item) return;

  const { top, bottom } = item.getBoundingClientRect();
  if (top < HEADER_HEIGHT) {
    window.scrollBy({ top: top - HEADER_HEIGHT });
  }

  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  if (bottom > windowHeight) {
    window.scrollBy({ top: bottom - windowHeight });
  }
}
