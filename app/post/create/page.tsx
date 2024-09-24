import { redirect } from "next/navigation";

import PostForm from "#app/post/create/form.jsx";
import { auth } from "#auth";
import { getImagePath } from "#lib/utils/supabase/imagePath.js";

async function PostCreatePage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return <PostForm imagePath={getImagePath({ session })} />;
}

export default PostCreatePage;
