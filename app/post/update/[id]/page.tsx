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
  const post = await getPost(params.id);

  if (!session || session.user?.id !== post.userId) {
    redirect(`/post/${params.id}`);
  }

  return <PostForm id={params.id} postData={post} />;
}
