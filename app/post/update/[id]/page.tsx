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

  return <PostForm session={session} id={params.id} postData={post} />;
}
