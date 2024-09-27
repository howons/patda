import CommentIndicator from "#app/post/[id]/_components/TitleBar/CommentIndicator.jsx";
import Title from "#app/post/[id]/_components/TitleBar/Title.jsx";
import { PLATFORM_COLOR, PLATFORM_NAME } from "#lib/constants/platform.js";
import { TAG_DESC, TAG_NAMES } from "#lib/constants/tag.js";
import { getPost } from "#lib/database/posts";
import type { Platform } from "#lib/types/property.js";
import Dot from "#ui/Dot/Dot.jsx";
import CategoryItem from "#ui/SearchBar/CategoryItem.jsx";
import TagItem from "#ui/TagItem/TagItem.jsx";

interface TitlebarProps {
  postId: number;
}

export default async function TitleBar({ postId }: TitlebarProps) {
  const {
    platform,
    targetNickname,
    tag,
    etcPlatformName,
    additionalInfo,
    commentCount,
  } = await getPost(postId);

  const platformNameStyle: { [key in Platform]: string } = {
    daangn: "text-orange-700",
    bunjang: "text-red-700",
    joongna: "text-green-700",
    etc: "text-zinc-700",
  };

  const platformNicknameStyle: { [key in Platform]: string } = {
    daangn: "text-orange-800",
    bunjang: "text-red-800",
    joongna: "text-green-800",
    etc: "text-zinc-800",
  };

  const platformLineStyle: { [key in Platform]: string } = {
    daangn: "border-orange-300",
    bunjang: "border-red-300",
    joongna: "border-green-300",
    etc: "border-zinc-300",
  };

  return (
    <div className="relative flex items-center">
      <div className="absolute -top-5 -rotate-45">
        <CategoryItem platform={platform} />
        <TagItem tag={tag} />
        <CommentIndicator
          postStatus="normal"
          commentCount={commentCount ?? 0}
          className="absolute right-20 top-20"
        />
      </div>
      <div className="flex grow flex-col">
        <section className="ml-24 flex h-14 items-center">
          <div>
            <Title
              className={`max-2xs:text-base ${platformNameStyle[platform]}`}>
              {platform === "etc" ? etcPlatformName : PLATFORM_NAME[platform]}
            </Title>
            <Title className={`2xs:hidden ${platformNicknameStyle[platform]}`}>
              {targetNickname}
            </Title>
          </div>
          <Dot
            colorStyle={PLATFORM_COLOR[platform]}
            className="mx-5 max-2xs:hidden"
          />
          <Title
            className={`max-2xs:hidden ${platformNicknameStyle[platform]}`}>
            {targetNickname}
          </Title>
          <Dot colorStyle={PLATFORM_COLOR[platform]} className="mx-5" />
          <p className="text-sm text-neutral-500">{additionalInfo}</p>
          <div
            className={`relative ml-8 h-0 grow border-b ${platformLineStyle[platform]}`}>
            <Dot
              colorStyle={PLATFORM_COLOR[platform]}
              className="absolute -left-1 -top-1"
            />
            <Dot
              colorStyle={PLATFORM_COLOR[platform]}
              size="md"
              className="absolute -right-2 -top-2"
            />
          </div>
        </section>
        <section className="ml-28 mt-4 flex h-14 flex-col xs:flex-row">
          <Title className="shrink-0 text-neutral-800">{TAG_NAMES[tag]}</Title>
          <Dot
            colorStyle="zinc"
            size="sm"
            className="mx-4 mt-2.5 max-xs:hidden"
          />
          <p className="mt-1 max-h-16 pr-2 text-sm text-neutral-500 xs:break-keep">
            {TAG_DESC[tag]}
          </p>
        </section>
      </div>
    </div>
  );
}
