import Content from "#app/post/[id]/_components/ContentContainer/Content.jsx";
import type { PostInfo } from "#lib/types/response.js";
import Dot from "#ui/Dot/Dot.jsx";

interface ContentContainerProps
  extends Pick<PostInfo, "platform" | "images" | "content" | "createdAt"> {}

export default function ContentContainer({
  platform,
  images,
  content,
  createdAt,
}: ContentContainerProps) {
  return (
    <div className="mt-3 flex">
      <div className="ml-2.5 flex shrink-0 grow-0 basis-5 flex-col items-center justify-center py-2">
        <Dot className="border-lime-300" />
        <div className="grow border-l border-lime-300" />
        <Dot size="md" className="border-lime-300" />
      </div>
      <div className="flex grow flex-col gap-4 sm:px-4">
        <section className="min-h-72">이미지</section>
        <Dot platform={platform} className="mx-auto" />
        <Content content={content} className="min-h-80" />
      </div>
    </div>
  );
}
