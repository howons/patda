import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import { getPost } from "#lib/database/posts";
import { getProfile } from "#lib/database/users.js";
import { parsePlatformUserInfo } from "#lib/utils/user.js";
import AuthorTag from "#ui/AuthorTag/AuthorTag.jsx";
import CommentLine from "#ui/SIdeLine/CommentLine.jsx";

interface AuthorContainerProps {
  postId: number;
}

export default async function AuthorContainer({
  postId,
}: AuthorContainerProps) {
  const { userId, platform, createdAt } = await getPost(postId);

  const profile = await getProfile(userId);
  const { nickname } = parsePlatformUserInfo(platform, profile);

  return (
    <div className="flex">
      <CommentLine bottomDotSize="md" data-comment-line-end />
      <AuthorTag
        name={nickname ?? "익명의 유저"}
        color={PLATFORM_COLOR[platform]}
        date={createdAt}
        className="mr-3 h-24 grow sm:px-4"
      />
    </div>
  );
}
