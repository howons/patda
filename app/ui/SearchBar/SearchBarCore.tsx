"use client";

import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { Platform } from "@lib/types/property";
import { useState } from "react";

const tempList = [
  { id: 1, name: "time", description: "dd" },
  { id: 2, name: "device", description: "dd" },
  { id: 3, name: "horizon", description: "dd" },
];

function SearchBarCore() {
  const [query, setQuery] = useState("");
  const platform = usePlatformStore((state) => state.platform);

  const platformStyle: { [key in Platform]: string } = {
    daangn: "focus:outline-orange-400",
    bunjang: "focus:outline-red-400",
    joongna: "focus:outline-green-400",
    etc: "focus:outline-zinc-400",
  };

  const inputDefaultStyle = "h-full grow rounded-r-full bg-transparent px-5";

  return (
    <input className={`${inputDefaultStyle} ${platformStyle[platform]}`} />
  );
}

export default SearchBarCore;
