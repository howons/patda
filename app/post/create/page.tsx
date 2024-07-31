import { redirect } from "next/navigation";

import PostForm from "#app/post/create/form.jsx";
import { auth } from "#auth";

async function PostCreatePage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return <PostForm />;
}

export default PostCreatePage;
