"use client";

import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import type { Platform } from "#lib/types/property.js";
import { cn } from "#utils/utils.js";

export default function CategoryDivider() {
  const platform = usePlatformStore((state) => state.platform);

  const platformStyle: { [key in Platform]: string } = {
    daangn: "border-orange-500",
    bunjang: "border-red-500",
    joongna: "border-green-500",
    etc: "border-zinc-500",
  };

  const defaultStyle =
    "absolute left-[5.4rem] top-[13%] aspect-square h-[73%] rotate-45 border-r border-t bg-white transition-colors duration-300";

  return (
    <div className="relative h-full w-0">
      <div className={cn(defaultStyle, platformStyle[platform])} />
    </div>
  );
}
