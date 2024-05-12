import { TroublemakerInfo } from "@lib/types/response";
import Thumbnail from "@ui/Thumbnail";

interface SearchListItemProps {
  itemInfo: TroublemakerInfo;
}

function SearchListItem({
  itemInfo: { nickname, platform, image },
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
