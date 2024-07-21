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
      {session ? <CommentForm session={session} /> : <div>로그인</div>}
    </section>
  );
}
