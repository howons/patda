"use client";

import { Fragment, HTMLAttributes } from "react";

import useSearchList from "#lib/hooks/useSearchList.js";
import Divider from "#ui/Divider/Divider.jsx";
import NoResults from "#ui/SearchList/NoResults.jsx";
import SearchListItem from "#ui/SearchList/SearchListItem.jsx";

interface SearchListProps extends HTMLAttributes<HTMLUListElement> {}

function SearchList({ className, ...props }: SearchListProps) {
  const troublemakers = useSearchList();

  return (
    <ul
      className={`flex w-full max-w-3xl flex-col sm:w-4/5 ${className}`}
      aria-label="검색목록"
      {...props}>
      <Divider direction="horizon" />
      {troublemakers.map((troublemaker) => (
        <Fragment key={troublemaker.id}>
          <SearchListItem itemInfo={troublemaker} />
          <Divider direction="horizon" />
        </Fragment>
      ))}
      {troublemakers.length <= 0 && (
        <>
          <NoResults />
          <Divider direction="horizon" />
        </>
      )}
    </ul>
  );
}

export default SearchList;
