"use client";

import { useSearchStore } from "@lib/providers/SearchStoreProvider";
import { TroublemakerInfo } from "@lib/types/response";
import Divider from "@ui/Divider";
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
];

interface SearchListProps extends HTMLAttributes<HTMLUListElement> {}

function SearchList({ className, ...props }: SearchListProps) {
  const searchList = useSearchStore((state) => state.searchResults);

  const troubleMakerList = searchList.length > 0 ? searchList : tempList;

  return (
    <ul className={`flex w-full flex-col ${className}`} {...props}>
      <Divider direction="horizon" />
      {troubleMakerList.map((troublemaker) => (
        <Fragment key={troublemaker.id}>
          <SearchListItem itemInfo={troublemaker} />
          <Divider direction="horizon" />
        </Fragment>
      ))}
    </ul>
  );
}

export default SearchList;
