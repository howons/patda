import Content from "#app/post/[id]/_components/ContentContainer/Content.jsx";
import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import type { PostInfo } from "#lib/types/response.js";
import Dot from "#ui/Dot/Dot.jsx";
import CommentLine from "#ui/SIdeLine/CommentLine.jsx";

interface ContentContainerProps
  extends Pick<PostInfo, "platform" | "images" | "content"> {}

export default function ContentContainer({
  platform,
  images,
  content,
}: ContentContainerProps) {
  return (
    <div className="mt-3 flex">
      <CommentLine topDotSize="sm" bottomDotSize="sm" className="pt-2" />
      <div className="flex grow flex-col gap-4 sm:px-4">
        <section className="min-h-72">이미지</section>
        <Dot color={PLATFORM_COLOR[platform]} className="mx-auto" />
        <Content content={content} className="min-h-40" />
      </div>
    </div>
  );
}
