import ContentContainer from "#app/post/[id]/_components/ContentContainer/ContentContainer.jsx";
import TitleBar from "#app/post/[id]/_components/TitleBar/TitleBar.jsx";
import AuthorContainer from "#app/post/[id]/(author)/AuthorContainer.jsx";
import CommentContainer from "#app/post/[id]/(comment)/CommentContainer.jsx";

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  return (
    <>
      <TitleBar postId={id} />
      <ContentContainer postId={id} />
      <AuthorContainer postId={id} />
      <CommentContainer postId={id} />
    </>
  );
}
