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

import { useSearchStore } from "#lib/providers/SearchStoreProvider.jsx";
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
  });
  const [activeItemIdx, setActiveItemIdx] = useState(0);
  const query = useSearchStore((store) => store.query);

  const handleInputKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!searchListRef.current) return;

    const listItems = searchListRef.current.querySelectorAll("li");
    const listLength = listItems.length;

    if (e.key === "ArrowUp") {
      setActiveItemIdx((idx) => (idx > 0 ? idx - 1 : idx));
    } else if (e.key === "ArrowDown") {
      setActiveItemIdx((idx) => (idx < listLength - 1 ? idx + 1 : idx));
    } else if (e.key === "Enter" && listItems) {
      listItems[activeItemIdx].click();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        setTroublemakersStatus((prev) => ({
          status: "LOADING",
          troublemakers: prev.troublemakers,
        }));
        const response = await fetch(`/api/v1/posts?nickname=${query}`);
        const posts = await response.json();
        setTroublemakersStatus({ status: "SUCCESS", troublemakers: posts });
      } catch (err) {
        setTroublemakersStatus((prev) => ({
          status: "ERROR",
          troublemakers: prev.troublemakers,
        }));
      }

      setActiveItemIdx(0);
    }, DEBOUNCE_INTERVAL);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

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
