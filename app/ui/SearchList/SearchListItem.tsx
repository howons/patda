import { TroublemakerInfo } from "@lib/types/response";
import Thumbnail from "@ui/Thumbnail";

interface SearchListItemProps {
  itemInfo: TroublemakerInfo;
}

function SearchListItem({
  itemInfo: { nickname, platform, image, additionalUserInfo, postCount },
}: SearchListItemProps) {
  const defaultStyle =
    "relative w-full flex rounded-lg p-3 text-zinc-700 cursor-pointer";

  return (
    <li className={`${defaultStyle}`}>
      <Thumbnail
        platform={platform}
        src={image}
        alt="프로필 사진"
        width={100}
        height={100}
        className="shrink-0 rounded-full"
      />
      <div className="ml-4 flex grow flex-col justify-between">
        <label className="text-xl font-bold">{nickname}</label>
        <p className="text-sm">{additionalUserInfo}</p>
        <div className="h-2" />
        <p className="text-right text-sm">{postCount}</p>
      </div>
    </li>
  );
}

export default SearchListItem;
