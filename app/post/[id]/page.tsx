import ContentContainer from "#app/post/[id]/_components/ContentContainer/ContentContainer.jsx";
import TitleBar from "#app/post/[id]/_components/TitleBar/TitleBar.jsx";
import { getPost } from "#lib/database/posts";

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const {
    platform,
    targetNickname,
    tag,
    images,
    content,
    createdAt,
    etcPlatformName,
  } = await getPost(params.id);

  return (
    <article className="mt-20 w-full max-w-3xl sm:w-4/5">
      <TitleBar
        platform={platform}
        targetNickname={targetNickname}
        tag={tag}
        etcPlatformName={etcPlatformName}
      />
      <ContentContainer
        platform={platform}
        images={images}
        content={content}
        createdAt={createdAt}
      />
    </article>
  );
}
