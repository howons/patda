import CommentIndicator from "#app/post/[id]/_components/TitleBar/CommentIndicator.jsx";
import Dot from "#app/post/[id]/_components/TitleBar/Dot.jsx";
import Title from "#app/post/[id]/_components/TitleBar/Title.jsx";
import { PLATFORM_NAME } from "#lib/constants/platform.js";
import { TAG_DESC, TAG_NAMES } from "#lib/constants/tag.js";
import type { Platform } from "#lib/types/property.js";
import type { PostInfo } from "#lib/types/response.js";
import CategoryItem from "#ui/SearchBar/CategoryItem.jsx";
import TagItem from "#ui/TagItem/TagItem.jsx";

interface TitlebarProps
  extends Pick<
    PostInfo,
    "platform" | "targetNickname" | "tag" | "etcPlatformName"
  > {}

export default function TitleBar({
  platform,
  targetNickname,
  tag,
  etcPlatformName,
}: TitlebarProps) {
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
          commentCount={0}
          className="absolute right-20 top-20"
        />
      </div>
      <div className="flex grow flex-col">
        <section className="ml-24 flex h-14 items-center">
          <div>
            <Title className={`${platformNameStyle[platform]}`}>
              {platform === "etc" ? etcPlatformName : PLATFORM_NAME[platform]}
            </Title>
            <Title className={`2xs:hidden ${platformNicknameStyle[platform]}`}>
              {targetNickname}
            </Title>
          </div>
          <Dot platform={platform} className="mx-5 max-2xs:hidden" />
          <Title
            className={`max-2xs:hidden ${platformNicknameStyle[platform]}`}>
            {targetNickname}
          </Title>
          <div
            className={`relative ml-8 h-0 grow border-b ${platformLineStyle[platform]}`}>
            <Dot platform={platform} className="absolute -left-1 -top-1" />
            <Dot
              platform={platform}
              size="md"
              className="absolute -right-2 -top-2"
            />
          </div>
        </section>
        <section className="ml-28 mt-4 flex h-14 flex-col xs:flex-row">
          <Title className="shrink-0 text-neutral-800">{TAG_NAMES[tag]}</Title>
          <Dot platform="etc" size="sm" className="mx-4 mt-2.5 max-xs:hidden" />
          <p className="mt-1 break-keep pr-2 text-sm text-neutral-500">
            {TAG_DESC[tag]}
          </p>
        </section>
      </div>
    </div>
  );
}
