import PostForm from "#app/post/create/form.jsx";
import { auth } from "#auth";

async function PostCreatePage() {
  const session = await auth();

  return <PostForm session={session} />;
}

export default PostCreatePage;
