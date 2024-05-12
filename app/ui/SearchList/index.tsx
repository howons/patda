"use client";

import { useSearchStore } from "@lib/providers/SearchStoreProvider";
import { TroublemakerInfo } from "@lib/types/response";
import SearchListItem from "@ui/SearchList/SearchListItem";
import { HTMLAttributes } from "react";

const tempList: TroublemakerInfo[] = [
  {
    id: 1,
    nickname: "qwer",
    platform: "daangn",
    image: "",
  },
  {
    id: 2,
    nickname: "asdf",
    platform: "bunjang",
    image: "",
  },
  {
    id: 3,
    nickname: "zxcv",
    platform: "joongna",
    image: "",
  },
];

interface SearchListProps extends HTMLAttributes<HTMLUListElement> {}

function SearchList({ className, ...props }: SearchListProps) {
  const searchList = useSearchStore((state) => state.searchResults);

  const troubleMakerList = searchList.length > 0 ? searchList : tempList;

  return (
    <ul className={`flex w-full flex-col gap-4 ${className}`} {...props}>
      {troubleMakerList.map((troublemaker) => (
        <SearchListItem key={troublemaker.id} itemInfo={troublemaker} />
      ))}
    </ul>
  );
}

export default SearchList;
