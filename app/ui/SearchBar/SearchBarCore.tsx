"use client";

import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { useSearchStore } from "@lib/providers/SearchStoreProvider";
import { Platform } from "@lib/types/property";
import { IoSearchOutline } from "@react-icons/all-files/io5/IoSearchOutline";

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

  const platformIconStyle: { [key in Platform]: string } = {
    daangn: "stroke-orange-300",
    bunjang: "stroke-red-300",
    joongna: "stroke-green-300",
    etc: "stroke-zinc-300",
  };

  return (
    <>
      <input
        className={`${inputDefaultStyle} ${platformStyle[platform]}`}
        value={query}
        onChange={(e) => updateQuery(e.target.value)}
        aria-label="검색바"
      />
      <IoSearchOutline
        className={`absolute right-1 top-1 size-6 transition-colors duration-300 ${platformIconStyle[platform]}`}
      />
    </>
  );
}

export default SearchBarCore;
