import type { Metadata } from "next";
import { redirect } from "next/navigation";

import PostProfileForm from "#app/post/[id]/_components/PostProfileForm/PostProfileForm.jsx";
import PostForm from "#app/post/create/form.jsx";
import { auth } from "#auth";
import { getProfile } from "#lib/database/users.js";
import { getImagePath } from "#lib/utils/supabase/imagePath.js";

export const metadata: Metadata = {
  title: "글 작성",
};

async function PostCreatePage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/");
  }

  const profile = await getProfile(userId);

  return (
    <>
      <PostForm imagePath={getImagePath({ session })} />
      <PostProfileForm profile={profile} />
    </>
  );
}

export default PostCreatePage;
