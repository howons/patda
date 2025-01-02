import type { Metadata } from "next";

import ContentContainer from "#app/post/[id]/_components/ContentContainer/ContentContainer.jsx";
import TitleBar from "#app/post/[id]/_components/TitleBar/TitleBar.jsx";
import AuthorContainer from "#app/post/[id]/(author)/AuthorContainer.jsx";
import CommentContainer from "#app/post/[id]/(comment)/CommentContainer.jsx";
import { PLATFORM_NAME } from "#lib/constants/platform.js";
import { getPost } from "#lib/database/posts";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = Number((await params).id);

  const { platform, targetNickname } = await getPost(id);

  return {
    title: `${PLATFORM_NAME[platform]}/${targetNickname}`,
  };
}

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
