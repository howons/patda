"use client";

import { HTMLAttributes } from "react";

import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import { useSearchListContext } from "#lib/providers/SearchListProvider.jsx";
import { postDataToJSX } from "#lib/utils/post.jsx";
import Divider from "#ui/Divider/Divider.jsx";
import Dot from "#ui/Dot/Dot.jsx";
import MoreButton from "#ui/SearchList/MoreButton.jsx";
import { cn } from "#utils/utils.js";

interface SearchListProps extends HTMLAttributes<HTMLUListElement> {}

export default function SearchList({ className, ...props }: SearchListProps) {
  const platform = usePlatformStore((state) => state.platform);
  const {
    activeItemIdx,
    searchListRef,
    troublemakersState,
    othersState,
    handleMoreClick,
  } = useSearchListContext();

  const Troublemakers = postDataToJSX(troublemakersState, activeItemIdx);
  const Others = postDataToJSX(othersState, activeItemIdx, true);

  return (
    <ul
      ref={searchListRef}
      className={cn("flex w-full max-w-3xl flex-col sm:w-4/5", className)}
      aria-label="검색목록"
      {...props}>
      <Divider direction="horizon" />
      {Troublemakers}
      <MoreButton
        status={troublemakersState.status}
        onClick={handleMoreClick()}
      />
      <Dot colorStyle={PLATFORM_COLOR[platform]} className="mx-auto my-8" />
      <Divider direction="horizon" />
      {Others}
      <MoreButton status={othersState.status} onClick={handleMoreClick(true)} />
    </ul>
  );
}
