"use client";

import { Fragment, HTMLAttributes } from "react";

import { useSearchListContext } from "#lib/providers/SearchListProvider.jsx";
import Divider from "#ui/Divider/Divider.jsx";
import Loading from "#ui/SearchList/Loading.jsx";
import NoResults from "#ui/SearchList/NoResults.jsx";
import SearchListItem from "#ui/SearchList/SearchListItem.jsx";

interface SearchListProps extends HTMLAttributes<HTMLUListElement> {}

function SearchList({ className, ...props }: SearchListProps) {
  const {
    troublemakersStatus: { status, troublemakers },
    searchListRef,
  } = useSearchListContext();

  let Items: JSX.Element | JSX.Element[] = <></>;
  if (status === "SUCCESS" && troublemakers.length > 0) {
    Items = troublemakers.map((troublemaker) => (
      <Fragment key={troublemaker.id}>
        <SearchListItem itemInfo={troublemaker} />
        <Divider direction="horizon" />
      </Fragment>
    ));
  } else if (status === "LOADING") {
    Items = (
      <>
        <Loading />
        <Divider direction="horizon" />
      </>
    );
  } else {
    Items = (
      <>
        <NoResults error={status === "ERROR"} />
        <Divider direction="horizon" />
      </>
    );
  }

  return (
    <ul
      ref={searchListRef}
      className={`flex w-full max-w-3xl flex-col sm:w-4/5 ${className}`}
      aria-label="검색목록"
      {...props}>
      <Divider direction="horizon" />
      {Items}
    </ul>
  );
}

export default SearchList;
