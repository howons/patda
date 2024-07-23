import type { ComponentProps } from "react";

import type { CommentInfo } from "#lib/types/response.js";

interface CommentListProps extends ComponentProps<"section"> {
  comments: CommentInfo[];
}

export default function CommentList({
  comments,
  className = "",
  ...props
}: CommentListProps) {
  return (
    <section className={`${className}`} {...props}>
      {comments.map((c) => c.content)}
    </section>
  );
}
