import { redirect } from "next/navigation";

import PostForm from "#app/post/create/form.jsx";
import { auth } from "#auth";
import { getPost } from "#lib/database/posts";

export default async function PostUpdatePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const {
    userId,
    content,
    etcPlatformName,
    tag,
    targetNickname,
    images,
    platform,
    additionalInfo,
  } = await getPost(params.id);

  if (!session || session.user?.id !== userId) {
    redirect(`/post/${params.id}`);
  }

  return (
    <PostForm
      id={params.id}
      content={content}
      etcPlatformName={etcPlatformName}
      images={images}
      platform={platform}
      tag={tag}
      targetNickname={targetNickname}
      additionalInfo={additionalInfo}
    />
  );
}
