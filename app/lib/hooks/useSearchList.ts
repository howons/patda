import { useEffect, useState } from "react";

import { useSearchStore } from "#lib/providers/SearchStoreProvider.jsx";
import type { SearchState } from "#lib/types/state.js";

const DEBOUNCE_INTERVAL = 200;

export default function useSearchList() {
  const [troubleMakersStatus, setTroublemakersStatus] = useState<SearchState>({
    status: "LOADING",
    troublemakers: [],
  });
  const query = useSearchStore((store) => store.query);

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
    }, DEBOUNCE_INTERVAL);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  return troubleMakersStatus;
}
