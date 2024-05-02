"use client";

import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";

import { Platform } from "@/types/property";

function Divider() {
  const platform = usePlatformStore((state) => state.platform);

  const platformStyle: { [key in Platform]: string } = {
    daangn: "",
    bunjang: "cs:border-red-500",
    joongna: "cs:border-green-500",
    etc: "cs:border-zinc-500",
  };

  const defaultStyle =
    "absolute -left-3 top-[13%] aspect-square h-[73%] rotate-45 border-r border-t border-orange-500 bg-white";

  return (
    <div className="relative h-full w-0">
      <div className={`${defaultStyle} ${platformStyle[platform]}`} />
    </div>
  );
}

export default Divider;
