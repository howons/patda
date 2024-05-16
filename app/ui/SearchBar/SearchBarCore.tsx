"use client";

import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { useSearchStore } from "@lib/providers/SearchStoreProvider";
import { Platform } from "@lib/types/property";

function SearchBarCore() {
  const { query, updateQuery } = useSearchStore((state) => state);
  const platform = usePlatformStore((state) => state.platform);

  const platformStyle: { [key in Platform]: string } = {
    daangn: "focus:outline-orange-400",
    bunjang: "focus:outline-red-400",
    joongna: "focus:outline-green-400",
    etc: "focus:outline-zinc-400",
  };

  const inputDefaultStyle = "h-full grow rounded-r-full bg-white px-5 min-w-0";

  return (
    <input
      className={`${inputDefaultStyle} ${platformStyle[platform]}`}
      value={query}
      onChange={(e) => updateQuery(e.target.value)}
      aria-label="검색바"
    />
  );
}

export default SearchBarCore;
