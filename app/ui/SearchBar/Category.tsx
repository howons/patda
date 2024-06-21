"use client";

import { PLATFORM_NAME, TRANS_DURATION } from "#lib/constants/platform";
import useLastPlatform from "#lib/hooks/useLastPlatform";
import { useCategoryStore } from "#lib/providers/CategoryStoreProvider";
import { CategoryDirection, Platform } from "#lib/types/property";

function Category() {
  const { lastPlatform, platform, isChanging } =
    useLastPlatform(TRANS_DURATION);
  const { direction, toggleActive } = useCategoryStore((state) => state);

  const defualtStyle =
    "relative w-24 h-full bg-white rounded-l-full overflow-hidden shrink-0";

  const labelDefaultStyle =
    "absolute w-full h-full ml-1 flex justify-center items-center select-none cursor-pointer transition-transform font-bold";

  const platformStyle: { [key in Platform]: string } = {
    daangn: "text-orange-700",
    bunjang: "text-red-700",
    joongna: "text-green-700",
    etc: "text-zinc-700",
  };

  const lastTransitionStyle: { [key in CategoryDirection]: string } = {
    up: isChanging ? "top-0 translate-y-full" : "top-full",
    left: isChanging ? "left-0 top-0 -translate-x-full" : "-left-full top-0",
    down: isChanging ? "bottom-0 -translate-y-full" : "bottom-full",
  };
  const transitionStyle: { [key in CategoryDirection]: string } = {
    up: isChanging ? "-top-full translate-y-full" : "top-0",
    left: isChanging ? "-left-full top-0 translate-x-full" : "left-0 top-0",
    down: isChanging ? "-bottom-full -translate-y-full" : "bottom-0",
  };

  const durationStyle = isChanging ? "duration-300" : "duration-0";

  return (
    <button
      className={`${defualtStyle}`}
      aria-label="검색할 카테고리 이름"
      onClick={() => toggleActive()}>
      <label
        className={`${labelDefaultStyle} ${platformStyle[lastPlatform]} ${lastTransitionStyle[direction]} ${durationStyle}`}
        aria-hidden>
        {PLATFORM_NAME[lastPlatform]}
      </label>
      <label
        className={`${labelDefaultStyle} ${platformStyle[platform]} ${transitionStyle[direction]} ${durationStyle}`}>
        {PLATFORM_NAME[platform]}
      </label>
    </button>
  );
}

export default Category;
