import { Platform } from "@lib/types/property";
import { TroublemakerInfo } from "@lib/types/response";

interface SearchListItemProps {
  itemInfo: TroublemakerInfo;
  platform: Platform;
}

function SearchListItem({ itemInfo, platform }: SearchListItemProps) {
  return <li>{itemInfo.nickname}</li>;
}

export default SearchListItem;
