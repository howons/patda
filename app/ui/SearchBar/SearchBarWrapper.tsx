"use client";

import { PropsWithChildren } from "react";

import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import type { Platform } from "#lib/types/property.js";
import { cn } from "#utils/utils.js";

export default function SearchBarWrapper({ children }: PropsWithChildren) {
  const platform = usePlatformStore((state) => state.platform);

  const platformStyle: { [key in Platform]: string } = {
    daangn: "border-orange-500",
    bunjang: "border-red-500",
    joongna: "border-green-500",
    etc: "border-zinc-500",
  };

  const defaultStyle =
    "relative border h-8 rounded-full flex items-center shadow-md transition-colors duration-300";

  return (
    <div className={cn(platformStyle[platform], defaultStyle)}>{children}</div>
  );
}
