"use client";

import { PLATFORM_NAME, TRANS_DURATION } from "@lib/constants/platform";
import useLastPlatform from "@lib/hooks/useLastPlatform";
import { useCategoryStore } from "@lib/providers/CategoryStoreProvider";
import { CategoryDirection, Platform } from "@lib/types/property";

function Category() {
  const { lastPlatform, platform, isChanging } =
    useLastPlatform(TRANS_DURATION);
  const { direction, toggleActive } = useCategoryStore((state) => state);

  const defualtStyle =
    "relative w-24 h-full bg-white rounded-l-full overflow-hidden";

  const labelDefaultStyle =
    "absolute w-full h-full ml-1 flex justify-center items-center select-none cursor-pointer transition-transform font-bold";

  const platformStyle: { [key in Platform]: string } = {
    daangn: "text-orange-700",
    bunjang: "text-red-700",
    joongna: "text-green-700",
    etc: "text-zinc-700",
  };

  const lastTransitionStyle: { [key in CategoryDirection]: string } = {
    up: isChanging
      ? "top-0 translate-y-full duration-300"
      : "top-full cs:duration-0",
    left: isChanging
      ? "left-0 -translate-x-full duration-300"
      : "-left-full cs:duration-0",
    down: isChanging
      ? "bottom-0 -translate-y-full duration-300"
      : "bottom-full cs:duration-0",
  };
  const transitionStyle: { [key in CategoryDirection]: string } = {
    up: isChanging
      ? "-top-full translate-y-full duration-300"
      : "top-0 cs:duration-0",
    left: isChanging
      ? "-left-full translate-x-full duration-300"
      : "left-0 cs:duration-0",
    down: isChanging
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

export default Category;
