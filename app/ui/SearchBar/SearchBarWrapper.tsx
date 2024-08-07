"use client";

import { PropsWithChildren } from "react";

import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import type { Platform } from "#lib/types/property.js";

function SearchBarWrapper({ children }: PropsWithChildren) {
  const platform = usePlatformStore((state) => state.platform);

  const platformStyle: { [key in Platform]: string } = {
    daangn: "",
    bunjang: "cs:border-red-500",
    joongna: "cs:border-green-500",
    etc: "cs:border-zinc-500",
  };

  const defaultStyle =
    "relative border h-8 border-orange-500 rounded-full flex items-center shadow-md transition-colors duration-300";

  return (
    <div className={`${platformStyle[platform]} ${defaultStyle}`}>
      {children}
    </div>
  );
}

export default SearchBarWrapper;
