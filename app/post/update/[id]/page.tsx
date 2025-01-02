import type { Metadata } from "next";
import { redirect } from "next/navigation";

import PostForm from "#app/post/create/form.jsx";
import { auth } from "#auth";
import { PLATFORM_NAME } from "#lib/constants/platform.js";
import { getPost } from "#lib/database/posts";
import { getImagePath } from "#lib/utils/supabase/imagePath.js";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = Number((await params).id);

  const { platform, targetNickname } = await getPost(id);

  return {
    title: `글 수정 - ${PLATFORM_NAME[platform]}/${targetNickname}`,
  };
}

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
