"use client";

import { IoCloseCircleOutline } from "@react-icons/all-files/io5/IoCloseCircleOutline";
import { IoSearchOutline } from "@react-icons/all-files/io5/IoSearchOutline";

import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import { useSearchListContext } from "#lib/providers/SearchListProvider.jsx";
import { useSearchStore } from "#lib/providers/SearchStoreProvider.jsx";
import type { Platform } from "#lib/types/property.js";
import { cn } from "#utils/utils.js";

export default function SearchBarCore() {
  const { query, updateQuery } = useSearchStore((state) => state);
  const platform = usePlatformStore((state) => state.platform);

  const { handleInputKeyDown } = useSearchListContext();

  const platformStyle: { [key in Platform]: string } = {
    daangn: "focus:outline-orange-400",
    bunjang: "focus:outline-red-400",
    joongna: "focus:outline-green-400",
    etc: "focus:outline-zinc-400",
  };

  const inputDefaultStyle = "h-full grow rounded-r-full bg-white px-5 min-w-0";

  const platformIconStyle: { [key in Platform]: string } = {
    daangn: "stroke-orange-300",
    bunjang: "stroke-red-300",
    joongna: "stroke-green-300",
    etc: "stroke-zinc-300",
  };

  return (
    <>
      <input
        className={cn(inputDefaultStyle, platformStyle[platform])}
        value={query}
        onChange={(e) => updateQuery(e.target.value)}
        onKeyDown={handleInputKeyDown}
        aria-label="검색바"
      />
      {query.length > 0 ? (
        <IoCloseCircleOutline
          className={cn(
            "absolute right-1.5 top-1 size-[1.3rem] cursor-pointer transition-colors duration-300",
            platformIconStyle[platform]
          )}
          onClick={() => {
            updateQuery("");
          }}
        />
      ) : (
        <IoSearchOutline
          className={cn(
            "absolute right-1 top-1 size-6 transition-colors duration-300",
            platformIconStyle[platform]
          )}
        />
      )}
    </>
  );
}
