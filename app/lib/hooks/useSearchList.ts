import { useEffect, useState } from "react";

import { useSearchStore } from "#lib/providers/SearchStoreProvider.jsx";
import type { TroublemakerInfo } from "#lib/types/response.js";

const DEBOUNCE_INTERVAL = 300;

export default function useSearchList() {
  const [troubleMakers, setTroubleMakers] = useState<TroublemakerInfo[]>([]);
  const query = useSearchStore((store) => store.query);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const response = await fetch(`/api/v1/posts?nickname=${query}`);
      const posts = await response.json();
      setTroubleMakers(posts);
    }, DEBOUNCE_INTERVAL);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  return troubleMakers;
}
