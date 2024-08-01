import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import { getPost } from "#lib/database/posts";
import { getUser } from "#lib/database/users.js";
import AuthorTag from "#ui/AuthorTag/AuthorTag.jsx";
import CommentLine from "#ui/SIdeLine/CommentLine.jsx";

interface AuthorContainerProps {
  postId: string;
}

export default async function AuthorContainer({
  postId,
}: AuthorContainerProps) {
  const { userId, platform, createdAt } = await getPost(postId);

  const userNickname = (await getUser(userId)).name;

  return (
    <div className="flex">
      <CommentLine bottomDotSize="md" data-comment-line-end />
      <AuthorTag
        name={userNickname ?? ""}
        color={PLATFORM_COLOR[platform]}
        date={createdAt}
        className="mr-3 h-24 grow sm:px-4"
      />
    </div>
  );
}
