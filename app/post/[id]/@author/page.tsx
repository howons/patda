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
      <div className="ml-2.5 flex shrink-0 grow-0 basis-5 flex-col items-center justify-center">
        <div className="grow border-l border-lime-300" />
        <Dot size="md" color="lime" />
      </div>
      <section className="flex h-16 grow items-center justify-end gap-4 text-sm text-neutral-500 sm:px-4">
        <p>{userNickname || anonymousUserNickname}</p>
        <Dot color={PLATFORM_COLOR[platform]} />
        <p>{formattedCreatedAt}</p>
      </section>
    </div>
  );
}
