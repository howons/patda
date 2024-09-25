import { redirect } from "next/navigation";

import PostForm from "#app/post/create/form.jsx";
import { auth } from "#auth";
import { getPost } from "#lib/database/posts";
import { getImagePath } from "#lib/utils/supabase/imagePath.js";

export default async function PostUpdatePage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

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
  } = await getPost(id);

  if (!session || session.user?.id !== userId) {
    redirect(`/post/${id}`);
  }

  return (
    <PostForm
      imagePath={getImagePath({ postId: id })}
      defaultValues={{
        content,
        etcPlatformName,
        tag,
        targetNickname,
        images,
        platform,
        additionalInfo,
      }}
      id={id}
    />
  );
}
