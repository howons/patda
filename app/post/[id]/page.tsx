import ContentContainer from "#app/post/[id]/_components/ContentContainer/ContentContainer.jsx";
import TitleBar from "#app/post/[id]/_components/TitleBar/TitleBar.jsx";
import AuthorContainer from "#app/post/[id]/(author)/AuthorContainer.jsx";
import CommentContainer from "#app/post/[id]/(comment)/CommentContainer.jsx";
import { auth } from "#auth";
import { getPost } from "#lib/database/posts";

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const { userId, platform, images, content } = await getPost(id);

  const session = await auth();
  const isMine = userId === session?.user?.id;

  return (
    <>
      <TitleBar postId={id} />
      <ContentContainer
        platform={platform}
        images={images}
        content={content}
        postId={id}
        isMine={isMine}
      />
      <AuthorContainer postId={id} />
      <CommentContainer postId={id} />
    </>
  );
}
