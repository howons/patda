import CommentForm from "#app/post/[id]/@comment/form.jsx";
import { auth } from "#auth";

export default async function CommentListPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  return (
    <section className="mt-3">
      <CommentForm session={session} postId={params.id} />
    </section>
  );
}
