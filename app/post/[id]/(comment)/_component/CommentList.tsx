import type { ComponentProps } from "react";

import CommentItem from "#app/post/[id]/(comment)/_component/CommentItem/CommentItem.jsx";
import { auth } from "#auth";
import { getComments } from "#lib/database/comments.js";
import { getPost } from "#lib/database/posts";
import { CommentProvider } from "#lib/providers/CommentProvider.jsx";
import Dot from "#ui/Dot/Dot.jsx";

interface CommentListProps extends ComponentProps<"section"> {
  postId: number;
}

export default async function CommentList({
  postId,
  className = "",
  ...props
}: CommentListProps) {
  const comments = await getComments(postId);
  const session = await auth();
  const { platform } = await getPost(postId);

  const commentCount = comments.reduce(
    (acc, cur) => (cur.status === "normal" ? acc + 1 : acc),
    0
  );
  const debateCount = comments.length - commentCount;

  return (
    <section className={`${className}`} {...props}>
      <div className="m-2 flex items-center gap-3">
        <p className="text-lg text-lime-700">{commentCount}개의 댓글</p>
        <Dot colorStyle={debateCount > 0 ? "rose" : "lime"} />
        <p className="text-lg text-rose-700">{debateCount}개의 반박</p>
      </div>
      <ul className="my-3 mr-3">
        {comments.map(
          (
            {
              id,
              userId,
              daangnNickname,
              bunjangNickname,
              joongnaNickname,
              etcNickname,
              ...commentInfo
            },
            idx
          ) => {
            let nickname: string | null = null;
            if (platform === "daangn") {
              nickname = daangnNickname;
            } else if (platform === "bunjang") {
              nickname = bunjangNickname;
            } else if (platform === "joongna") {
              nickname = joongnaNickname;
            } else if (platform === "etc") {
              nickname = etcNickname;
            }

            return (
              <CommentProvider
                key={id}
                id={id}
                nickname={nickname}
                {...commentInfo}>
                <CommentItem
                  isMine={userId === session?.user?.id}
                  isLast={idx === comments.length - 1}
                />
              </CommentProvider>
            );
          }
        )}
      </ul>
    </section>
  );
}
