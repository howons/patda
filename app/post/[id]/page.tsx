import TitleBar from "#app/post/[id]/TitleBar.jsx";
import { getPost } from "#lib/database/posts";

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { platform, targetNickname, tag } = await getPost(params.id);

  return (
    <article className="mt-8 w-4/5 max-w-3xl">
      <TitleBar platform={platform} targetNickname={targetNickname} tag={tag} />
    </article>
  );
}
