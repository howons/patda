import CommentLine from "#app/post/[id]/@author/_component/CommentLine.jsx";
import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import { getPost } from "#lib/database/posts";
import { getUser } from "#lib/database/users.js";
import Dot from "#ui/Dot/Dot.jsx";

export default async function AuthorPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId, platform, createdAt, anonymousUserNickname } = await getPost(
    params.id
  );

  let userNickname = null;
  if (userId !== null) {
    userNickname = (await getUser(userId)).name;
  }

  const formattedCreatedAt = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(createdAt);

  return (
    <div className="flex">
      <CommentLine />
      <section className="flex h-16 grow items-center justify-end gap-4 text-sm text-neutral-500 sm:px-4">
        <p>{userNickname || anonymousUserNickname}</p>
        <Dot color={PLATFORM_COLOR[platform]} />
        <p>{formattedCreatedAt}</p>
      </section>
    </div>
  );
}
