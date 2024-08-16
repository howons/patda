import { redirect } from "next/navigation";

import PostForm from "#app/post/create/form.jsx";
import { auth } from "#auth";
import { ImageFormProvider } from "#lib/providers/ImageFormProvider.jsx";
import ImageForm from "#ui/ImageForm/ImageForm.jsx";

async function PostCreatePage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <ImageFormProvider>
      <PostForm />
      <ImageForm />
    </ImageFormProvider>
  );
}

export default PostCreatePage;
