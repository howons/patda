import PostCreateForm from "#app/post/create/form";
import { auth } from "#auth";

async function PostCreatePage() {
  const session = await auth();

  return <PostCreateForm session={session} />;
}

export default PostCreatePage;
