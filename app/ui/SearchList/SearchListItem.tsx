import Link from "next/link";

import { PLATFORM_COLOR, PLATFORM_NAME } from "#lib/constants/platform.js";
import { TAG_NAMES } from "#lib/constants/tag.js";
import type { Platform } from "#lib/types/property.js";
import type { TroublemakerInfo } from "#lib/types/response.js";
import Dot from "#ui/Dot/Dot.jsx";
import Thumbnail from "#ui/Thumbnail/Thumbnail.jsx";

interface SearchListItemProps {
  itemInfo: TroublemakerInfo;
}

function SearchListItem({
  itemInfo: {
    targetNickname,
    platform,
    status,
    tag,
    etcPlatformName,
    createdAt,
  },
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
    <li className={`shrink-0 ${platformStyle[platform]}`}>
      <Link href={""} className={defaultStyle}>
        <Thumbnail
          platform={platform}
          src=""
          alt="프로필 사진"
          width={100}
          height={100}
          className="shrink-0 rounded-full"
        />
        <div className="ml-4 flex grow flex-col justify-between">
          <label className="text-xl font-bold">{targetNickname}</label>
          <p className="text-sm">
            {PLATFORM_NAME[platform]}
            {platform === "etc" && (
              <>
                <Dot color={PLATFORM_COLOR[platform]} />
                {etcPlatformName}
              </>
            )}
          </p>
          <div className="h-2" />
          <p className="text-right text-sm">{TAG_NAMES[tag]}</p>
        </div>
      </Link>
    </li>
  );
}

export default SearchListItem;
