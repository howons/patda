import Content from "#app/post/[id]/_components/ContentContainer/Content.jsx";
import PostMutationForm from "#app/post/[id]/_components/ContentContainer/PostMutationForm.jsx";
import { auth } from "#auth";
import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import { getPost } from "#lib/database/posts";
import Dot from "#ui/Dot/Dot.jsx";
import CommentLine from "#ui/SIdeLine/CommentLine.jsx";

interface ContentContainerProps {
  postId: number;
}

export default async function ContentContainer({
  postId,
}: ContentContainerProps) {
  const { userId, platform, images, content } = await getPost(postId);

  const session = await auth();
  const isMine = userId === session?.user?.id;

  return (
    <div className="mt-3 flex">
      <CommentLine topDotSize="sm" bottomDotSize="sm" className="pt-2" />
      <div className="flex min-w-0 grow flex-col gap-4 max-xs:mt-12 sm:px-4">
        <section className="h-6 px-2">
          {isMine && <PostMutationForm postId={postId} />}
        </section>
        <section className="min-h-72">이미지</section>
        <Dot color={PLATFORM_COLOR[platform]} className="mx-auto" />
        <Content content={content} className="min-h-40 w-full break-words" />
      </div>
    </div>
  );
}
