import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import { getPost } from "#lib/database/posts";
import { getUser } from "#lib/database/users.js";
import AuthorTag from "#ui/AuthorTag/AuthorTag.jsx";
import CommentLine from "#ui/SIdeLine/CommentLine.jsx";

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

  return (
    <div className="flex">
      <CommentLine bottomDotSize="md" />
      <AuthorTag
        name={userNickname || anonymousUserNickname || ""}
        color={PLATFORM_COLOR[platform]}
        date={createdAt}
        className="mr-3 h-24 grow"
      />
    </div>
  );
}
