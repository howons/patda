import type { ComponentProps } from "react";

import CommentItem from "#app/post/[id]/@comment/_component/CommentItem.jsx";
import type { CommentInfo } from "#lib/types/response.js";
import Dot from "#ui/Dot/Dot.jsx";

interface CommentListProps extends ComponentProps<"section"> {
  comments: CommentInfo[];
}

export default function CommentList({
  comments,
  className = "",
  ...props
}: CommentListProps) {
  const commentCount = comments.reduce(
    (acc, cur) => (cur.status === "normal" ? acc + 1 : acc),
    0
  );
  const debateCount = comments.length - commentCount;

  return (
    <section className={`${className}`} {...props}>
      <div className="m-2 flex items-center gap-3">
        <p className="text-lg text-lime-700">{commentCount}개의 댓글</p>
        <Dot color={debateCount > 0 ? "rose" : "lime"} />
        <p className="text-lg text-rose-700">{debateCount}개의 반박</p>
      </div>
      <ul className="my-3">
        {comments.map((comment, idx) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isLast={idx === comments.length - 1}
          />
        ))}
      </ul>
    </section>
  );
}
