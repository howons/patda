"use client";

import { PLATFORM_NAME, TRANS_DURATION } from "@lib/constants/platform";
import { useCategoryStore } from "@lib/providers/CategoryStoreProvider";
import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { CategoryDirection, Platform } from "@lib/types/property";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";

function Category() {
  const [lastPlatform, setLastPlatform] = useState<Platform>("daangn");
  const transitionTimer = useRef<NodeJS.Timeout | null>(null);
  const platform = usePlatformStore((state) => state.platform);
  const { direction, toggleActive } = useCategoryStore((state) => state);

  const shouldChange = platform !== lastPlatform;
  setTransitionTimer(shouldChange, transitionTimer, setLastPlatform, platform);

  const defualtStyle =
    "relative w-24 h-full bg-white rounded-l-full overflow-hidden";

  const labelDefaultStyle =
    "absolute w-full h-full ml-1 flex justify-center items-center select-none cursor-pointer transition-transform";

  const platformStyle: { [key in Platform]: string } = {
    daangn: "text-orange-700",
    bunjang: "text-red-700",
    joongna: "text-green-700",
    etc: "text-zinc-700",
  };

  const lastTransitionStyle: { [key in CategoryDirection]: string } = {
    up: shouldChange
      ? "top-0 translate-y-full duration-300"
      : "top-full cs:duration-0",
    left: shouldChange
      ? "left-0 -translate-x-full duration-300"
      : "-left-full cs:duration-0",
    down: shouldChange
      ? "bottom-0 -translate-y-full duration-300"
      : "bottom-full cs:duration-0",
  };
  const transitionStyle: { [key in CategoryDirection]: string } = {
    up: shouldChange
      ? "-top-full translate-y-full duration-300"
      : "top-0 cs:duration-0",
    left: shouldChange
      ? "-left-full translate-x-full duration-300"
      : "left-0 cs:duration-0",
    down: shouldChange
      ? "-bottom-full -translate-y-full duration-300"
      : "bottom-0 cs:duration-0",
  };

  return (
    <div className={`${defualtStyle}`} onClick={() => toggleActive()}>
      <label
        className={`${labelDefaultStyle} ${platformStyle[lastPlatform]} ${lastTransitionStyle[direction]}`}>
        {PLATFORM_NAME[lastPlatform]}
      </label>
      <label
        className={`${labelDefaultStyle} ${platformStyle[platform]} ${transitionStyle[direction]}`}>
        {PLATFORM_NAME[platform]}
      </label>
    </div>
  );
}

function setTransitionTimer(
  shouldChange: Boolean,
  transitionTimer: MutableRefObject<NodeJS.Timeout | null>,
  setLastPlatform: Dispatch<SetStateAction<Platform>>,
  curPlatform: Platform
) {
  if (shouldChange && !transitionTimer.current) {
    transitionTimer.current = setTimeout(() => {
      setLastPlatform(curPlatform);
      transitionTimer.current = null;
    }, TRANS_DURATION);
  }
}

export default Category;
