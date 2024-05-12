import { Platform } from "@lib/types/property";
import { TroublemakerInfo } from "@lib/types/response";
import Thumbnail from "@ui/Thumbnail";

interface SearchListItemProps {
  itemInfo: TroublemakerInfo;
  platform: Platform;
}

function SearchListItem({
  itemInfo: { nickname, image },
  platform,
}: SearchListItemProps) {
  const defaultStyle = "w-full flex";

  return (
    <li className={`${defaultStyle}`}>
      <Thumbnail
        platform={platform}
        src={image}
        alt="프로필 사진"
        width={100}
        height={100}
      />
      {nickname}
    </li>
  );
}

export default SearchListItem;
