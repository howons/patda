import { Platform } from "@lib/types/property";
import { TroublemakerInfo } from "@lib/types/response";
import Thumbnail from "@ui/Thumbnail";
import Link from "next/link";

interface SearchListItemProps {
  itemInfo: TroublemakerInfo;
}

function SearchListItem({
  itemInfo: { nickname, platform, image, additionalUserInfo, postCount },
}: SearchListItemProps) {
  const defaultStyle = "w-full flex rounded-3xl p-3 text-zinc-700 bg-white";

  const bunjangBeforeStyle =
    "before:absolute before:-top-5 before:-left-5 before:rotate-45 before:w-6 before:aspect-square before:bg-red-400 before:transition-all hover:before:w-9";
  const bunjangAfterStyle =
    "after:absolute after:-bottom-5 after:-right-5 after:rotate-45 after:w-8 after:aspect-square after:bg-red-400 after:transition-all hover:after:w-[2.15rem]";

  const joongnaBeforeStyle =
    "before:absolute before:bottom-0 before:-left-5 before:w-5 before:aspect-square before:bg-green-400 before:transition-transform hover:before:translate-x-5";
  const joongnaAfterStyle =
    "after:absolute after:bottom-0 after:-right-2 after:w-3 after:h-full after:bg-green-400 after:transition-transform hover:after:-translate-x-1";

  const platformStyle: { [key in Platform]: string } = {
    daangn:
      "bg-orange-400 rounded-3xl rounded-br-md transition-all hover:rounded-none",
    bunjang: `relative overflow-hidden ${bunjangBeforeStyle} ${bunjangAfterStyle}`,
    joongna: `relative overflow-hidden rounded-l-3xl transition-all hover:rounded-br-xl ${joongnaBeforeStyle} ${joongnaAfterStyle}`,
    etc: "",
  };

  return (
    <li className={platformStyle[platform]}>
      <Link href={""} className={defaultStyle}>
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
      </Link>
    </li>
  );
}

export default SearchListItem;
