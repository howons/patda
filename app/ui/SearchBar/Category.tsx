"use client";

import { PLATFORM_NAME } from "@lib/constants/platform";
import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { Platform } from "@lib/types/property";
import { useRef } from "react";

function Category() {
  const lastPlatform = useRef<Platform>("daangn");
  const { platform, direction } = usePlatformStore((state) => state);

  const defualtStyle =
    "relative w-24 h-full pl-1 bg-white rounded-l-full overflow-hidden select-none cursor-pointer";

  const labelDefaultStyle = "absolute";

  const platformStyle: { [key in Platform]: string } = {
    daangn: "text-orange-700",
    bunjang: "text-red-700",
    joongna: "text-green-700",
    etc: "text-zinc-700",
  };

  return (
    <div className={`${defualtStyle}`}>
      <label className={`${platformStyle[platform]}`}>
        {PLATFORM_NAME[platform]}
      </label>
    </div>
  );
}

export default Category;
