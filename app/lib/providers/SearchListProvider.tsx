"use client";

import {
  createContext,
  type KeyboardEventHandler,
  type ReactNode,
  type RefObject,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

import useInfiniteSearch from "#lib/hooks/useInfiniteSearch.js";
import type { InfinitePostsInfo } from "#lib/types/response.js";
import type { SearchState } from "#lib/types/state.js";

interface SearchListValue {
  activeItemIdx: number;
  searchListRef: RefObject<HTMLUListElement | HTMLOListElement>;
  troublemakersState: SearchState;
  setTroublemakersSize: (
    size: number | ((_size: number) => number)
  ) => Promise<InfinitePostsInfo[] | undefined>;
  othersState: SearchState;
  setOthersSize: (
    size: number | ((_size: number) => number)
  ) => Promise<InfinitePostsInfo[] | undefined>;
  handleInputKeyDown: KeyboardEventHandler<HTMLDivElement>;
}

const SearchListContext = createContext<SearchListValue | null>(null);

interface SearchListProviderProps {
  children: ReactNode;
}

export const SearchListProvider = ({ children }: SearchListProviderProps) => {
  const searchListRef = useRef<HTMLUListElement | HTMLOListElement>(null);
  const [activeItemIdx, setActiveItemIdx] = useState(0);

  const handleQueryKeyChange = useCallback(() => setActiveItemIdx(-1), []);
  const { state: troublemakersState, setSize: setTroublemakersSize } =
    useInfiniteSearch({
      onChange: handleQueryKeyChange,
    });
  const { state: othersState, setSize: setOthersSize } = useInfiniteSearch({
    onChange: handleQueryKeyChange,
    isExclude: true,
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

  const value: SearchListValue = {
    activeItemIdx,
    searchListRef,
    troublemakersState,
    setTroublemakersSize,
    othersState,
    setOthersSize,
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
