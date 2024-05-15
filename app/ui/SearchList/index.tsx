"use client";

import { useSearchStore } from "@lib/providers/SearchStoreProvider";
import { TroublemakerInfo } from "@lib/types/response";
import Divider from "@ui/Divider";
import NoResults from "@ui/SearchList/NoResults";
import SearchListItem from "@ui/SearchList/SearchListItem";
import { Fragment, HTMLAttributes } from "react";

const tempList: TroublemakerInfo[] = [
  {
    id: 1,
    nickname: "qwer",
    platform: "daangn",
    additionalUserInfo: "당근동",
    image: "",
    postCount: 2,
  },
  {
    id: 2,
    nickname: "asdf",
    platform: "bunjang",
    additionalUserInfo: "김*공",
    image: "",
    postCount: 1,
  },
  {
    id: 3,
    nickname: "zxcv",
    platform: "joongna",
    additionalUserInfo: "wer123",
    image: "",
    postCount: 3,
  },
  {
    id: 4,
    nickname: "1234",
    platform: "etc",
    additionalUserInfo: "짭고나라",
    image: "",
    postCount: 4,
  },
];

interface SearchListProps extends HTMLAttributes<HTMLUListElement> {}

function SearchList({ className, ...props }: SearchListProps) {
  const { query, searchResults, isActive } = useSearchStore((state) => state);

  const troubleMakerList = query.length > 0 ? searchResults : tempList;

  if (!isActive) return null;

  return (
    <ul className={`flex w-full flex-col ${className}`} {...props}>
      <Divider direction="horizon" />
      {troubleMakerList.map((troublemaker) => (
        <Fragment key={troublemaker.id}>
          <SearchListItem itemInfo={troublemaker} />
          <Divider direction="horizon" />
        </Fragment>
      ))}
      {troubleMakerList.length <= 0 && (
        <>
          <NoResults />
          <Divider direction="horizon" />
        </>
      )}
    </ul>
  );
}

export default SearchList;
