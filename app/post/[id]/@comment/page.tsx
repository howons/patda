import CommentList from "#app/post/[id]/@comment/_component/CommentList.jsx";
import CommentForm from "#app/post/[id]/@comment/form.jsx";
import { auth } from "#auth";

export default async function CommentListPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  return (
    <>
      <section className="my-3">
        <CommentForm session={session} postId={params.id} />
      </section>
      <CommentList postId={params.id} />
    </>
  );
}
