"use client";

import { Fragment, HTMLAttributes } from "react";

import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import { useSearchListContext } from "#lib/providers/SearchListProvider.jsx";
import type { TroublemakerInfo } from "#lib/types/response.js";
import type { SearchState } from "#lib/types/state.js";
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
    searchListRef,
    troublemakersState,
    setTroublemakersSize,
    othersState,
    setOthersSize,
  } = useSearchListContext();

  const itemFactory = convertItems();
  const Troublemakers = itemFactory(troublemakersState, activeItemIdx);
  const Others = itemFactory(othersState, activeItemIdx, true);

  return (
    <ul
      ref={searchListRef}
      className={`flex w-full max-w-3xl flex-col sm:w-4/5 ${className}`}
      aria-label="검색목록"
      {...props}>
      <Divider direction="horizon" />
      {Troublemakers}
      <Dot color={PLATFORM_COLOR[platform]} className="mx-auto my-8" />
      <Divider direction="horizon" />
      {Others}
    </ul>
  );
}

function convertItems() {
  let idxCounter = 0;

  return function ConvertedItems(
    state: SearchState,
    activeItemIdx: number,
    single?: boolean
  ) {
    let Items: JSX.Element | JSX.Element[] = <></>;
    const troublemakerMapper = (troublemaker: TroublemakerInfo) => (
      <Fragment key={troublemaker.id}>
        <SearchListItem
          itemInfo={troublemaker}
          isActive={idxCounter++ === activeItemIdx}
        />
        <Divider direction="horizon" />
      </Fragment>
    );

    const { status, troublemakers } = state;
    if (status === "LOADING") {
      Items = (
        <>
          <Loading single={single} />
          <Divider direction="horizon" />
        </>
      );
    } else if (status === "ERROR") {
      Items = (
        <>
          <NoResults error={true} single={single} />
          <Divider direction="horizon" />
        </>
      );
    } else if (troublemakers.length <= 0) {
      Items = (
        <>
          <NoResults single={single} />
          <Divider direction="horizon" />
        </>
      );
    } else {
      Items = troublemakers.map(troublemakerMapper);

      if (status === "LOADING_MORE") {
        Items.push(
          <>
            <Loading single={single} />
            <Divider direction="horizon" />
          </>
        );
      }
    }

    return Items;
  };
}
