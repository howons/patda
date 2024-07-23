import CommentList from "#app/post/[id]/@comment/_component/CommentList.jsx";
import CommentForm from "#app/post/[id]/@comment/form.jsx";
import { auth } from "#auth";
import { getComments } from "#lib/database/comments.js";

export default async function CommentListPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const comments = await getComments(params.id);

  return (
    <>
      <section className="my-3">
        <CommentForm session={session} postId={params.id} />
      </section>
      <CommentList comments={comments} />
    </>
  );
}
