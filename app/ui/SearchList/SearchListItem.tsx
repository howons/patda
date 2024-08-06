import Link from "next/link";

import { PLATFORM_COLOR, PLATFORM_NAME } from "#lib/constants/platform.js";
import { TAG_NAMES } from "#lib/constants/tag.js";
import type { Platform } from "#lib/types/property.js";
import type { TroublemakerInfo } from "#lib/types/response.js";
import AuthorTag from "#ui/AuthorTag/AuthorTag.jsx";
import Dot from "#ui/Dot/Dot.jsx";
import TagItem from "#ui/TagItem/TagItem.jsx";
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
    additionalInfo,
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
          className="size-20 shrink-0 rounded-full xs:size-24"
        />
        <div className="ml-4 flex grow flex-col justify-between">
          <label className="ml-2 text-xl font-bold">{targetNickname}</label>
          <div className="ml-2 flex items-center gap-2 text-sm">
            {PLATFORM_NAME[platform]}
            {platform === "etc" && (
              <>
                <Dot color={PLATFORM_COLOR[platform]} />
                {etcPlatformName}
              </>
            )}
            {additionalInfo && (
              <>
                <Dot color={PLATFORM_COLOR[platform]} />
                {additionalInfo}
              </>
            )}
          </div>
          <span className="h-1" />
          <div className="relative flex items-center">
            <TagItem
              tag={tag}
              size="sm"
              className="absolute -left-10 -top-3 -rotate-45"
            />
            <p className="mt-1 text-sm text-neutral-500">{TAG_NAMES[tag]}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <AuthorTag
            color={PLATFORM_COLOR[platform]}
            date={createdAt}
            summary
          />
        </div>
      </Link>
    </li>
  );
}

export default SearchListItem;
