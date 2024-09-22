import CommentList from "#app/post/[id]/(comment)/_component/CommentList.jsx";
import CommentForm from "#app/post/[id]/(comment)/form.jsx";
import { auth } from "#auth";
import { getImagePath } from "#lib/utils/supabase/imagePath.js";

interface CommentContainerProps {
  postId: number;
}

export default async function CommentContainer({
  postId,
}: CommentContainerProps) {
  const session = await auth();

  const formImagePath = session ? getImagePath({ session, postId }) : "";

  return (
    <>
      <section className="my-3">
        <CommentForm
          session={session}
          postId={postId}
          imagePath={formImagePath}
        />
      </section>
      <CommentList postId={postId} />
    </>
  );
}
