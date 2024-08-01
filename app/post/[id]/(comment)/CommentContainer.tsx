import CommentList from "#app/post/[id]/(comment)/_component/CommentList.jsx";
import CommentForm from "#app/post/[id]/(comment)/form.jsx";
import { auth } from "#auth";

interface CommentContainerProps {
  postId: string;
}

export default async function CommentContainer({
  postId,
}: CommentContainerProps) {
  const session = await auth();

  return (
    <>
      <section className="my-3">
        <CommentForm session={session} postId={postId} />
      </section>
      <CommentList postId={postId} />
    </>
  );
}
