import CommentLine from "#app/post/[id]/_components/ContentContainer/CommentLine.jsx";
import Content from "#app/post/[id]/_components/ContentContainer/Content.jsx";
import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import type { PostInfo } from "#lib/types/response.js";
import Dot from "#ui/Dot/Dot.jsx";

interface ContentContainerProps
  extends Pick<PostInfo, "platform" | "images" | "content"> {}

export default function ContentContainer({
  platform,
  images,
  content,
}: ContentContainerProps) {
  return (
    <div className="mt-3 flex">
      <CommentLine />
      <div className="flex grow flex-col gap-4 sm:px-4">
        <section className="min-h-72">이미지</section>
        <Dot color={PLATFORM_COLOR[platform]} className="mx-auto" />
        <Content content={content} className="min-h-40" />
      </div>
    </div>
  );
}
