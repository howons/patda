"use client";

import { Fragment, HTMLAttributes } from "react";

import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import { useSearchListContext } from "#lib/providers/SearchListProvider.jsx";
import type { TroublemakerInfo } from "#lib/types/response.js";
import Divider from "#ui/Divider/Divider.jsx";
import Dot from "#ui/Dot/Dot.jsx";
import Loading from "#ui/SearchList/Loading.jsx";
import NoResults from "#ui/SearchList/NoResults.jsx";
import SearchListItem from "#ui/SearchList/SearchListItem.jsx";

interface SearchListProps extends HTMLAttributes<HTMLUListElement> {}

export default function SearchList({ className, ...props }: SearchListProps) {
  const platform = usePlatformStore((state) => state.platform);
  const {
    activeItemIdx,
    troublemakersStatus: { status, troublemakers, otherPlatformTroublemakers },
    searchListRef,
  } = useSearchListContext();

  let Items: JSX.Element | JSX.Element[] = <></>;
  let OtherPlatformItems: JSX.Element | JSX.Element[] = <></>;
  let idxCounter = 0;
  const troublemakerMapper = (troublemaker: TroublemakerInfo) => (
    <Fragment key={troublemaker.id}>
      <SearchListItem
        itemInfo={troublemaker}
        isActive={idxCounter++ === activeItemIdx}
      />
      <Divider direction="horizon" />
    </Fragment>
  );

  if (status === "LOADING") {
    Items = (
      <>
        <Loading />
        <Divider direction="horizon" />
      </>
    );
    OtherPlatformItems = (
      <>
        <Loading single />
        <Divider direction="horizon" />
      </>
    );
  } else {
    if (status === "SUCCESS") {
      if (troublemakers.length > 0) {
        Items = troublemakers.map(troublemakerMapper);
      }
      if (otherPlatformTroublemakers.length > 0) {
        OtherPlatformItems = otherPlatformTroublemakers.map(troublemakerMapper);
      }
    }
    if (status === "ERROR" || troublemakers.length <= 0) {
      Items = (
        <>
          <NoResults error={status === "ERROR"} />
          <Divider direction="horizon" />
        </>
      );
    }
    if (status === "ERROR" || otherPlatformTroublemakers.length <= 0) {
      OtherPlatformItems = (
        <>
          <NoResults error={status === "ERROR"} single />
          <Divider direction="horizon" />
        </>
      );
    }
  }

  return (
    <ul
      ref={searchListRef}
      className={`flex w-full max-w-3xl flex-col sm:w-4/5 ${className}`}
      aria-label="검색목록"
      {...props}>
      <Divider direction="horizon" />
      {Items}
      <Dot color={PLATFORM_COLOR[platform]} className="mx-auto my-8" />
      <Divider direction="horizon" />
      {OtherPlatformItems}
    </ul>
  );
}
