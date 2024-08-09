import { FaRegComment } from "@react-icons/all-files/fa/FaRegComment";
import { RiScales3Line } from "@react-icons/all-files/ri/RiScales3Line";
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
  isActive?: boolean;
}

function SearchListItem({
  itemInfo: {
    id,
    targetNickname,
    platform,
    status,
    tag,
    etcPlatformName,
    additionalInfo,
    createdAt,
    commentCount,
  },
  isActive,
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
    etc: "rounded-3xl transition-all hover:shadow",
  };

  const activeStyles: { [key in Platform]: string } = {
    daangn: isActive ? "rounded-none" : "",
    bunjang: isActive ? "before:w-9 after:w-[2.15rem]" : "",
    joongna: isActive
      ? "before:translate-x-5 after:-translate-x-1 rounded-br-xl"
      : "",
    etc: isActive ? "shadow" : "",
  };

  const commentSvgStyle = "size-4 fill-stone-500/50";

  return (
    <li
      className={`shrink-0 ${platformStyle[platform]} ${activeStyles[platform]}`}>
      <Link href={`/post/${id}`} className={defaultStyle}>
        <Thumbnail
          platform={platform}
          src=""
          alt="프로필 사진"
          className="size-20 shrink-0 rounded-full xs:size-24"
        />
        <div className="ml-4 flex grow flex-col justify-around">
          <div className="flex items-center gap-2">
            <label className="text-xl font-bold">{targetNickname}</label>
            <Dot color={PLATFORM_COLOR[platform]} />
            <div className="flex shrink-0 text-sm max-xs:flex-col xs:items-center xs:gap-2 ">
              {platform !== "etc" ? PLATFORM_NAME[platform] : etcPlatformName}
              {additionalInfo && (
                <>
                  <Dot
                    color={PLATFORM_COLOR[platform]}
                    className="max-xs:hidden"
                  />
                  <p>{additionalInfo}</p>
                </>
              )}
            </div>
          </div>
          <div className="ml-2 flex items-center">
            <TagItem tag={tag} size="sm" className="shrink-0 -rotate-45" />
            <p className="mt-1 pl-4 text-neutral-700 max-xs:text-sm">
              {TAG_NAMES[tag]}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between pr-1">
          <AuthorTag
            color={PLATFORM_COLOR[platform]}
            date={createdAt}
            summary
          />
          <div className="flex items-center justify-end gap-2 text-sm text-neutral-400">
            {status === "debate" ? (
              <RiScales3Line className={commentSvgStyle} />
            ) : (
              <FaRegComment className={commentSvgStyle} />
            )}
            {commentCount ?? 0}
          </div>
        </div>
      </Link>
    </li>
  );
}

export default SearchListItem;
