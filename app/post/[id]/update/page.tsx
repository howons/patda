import PostForm from "#app/post/create/form.jsx";
import { auth } from "#auth";

export default async function PostUpdatePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  return <PostForm session={session} />;
}
