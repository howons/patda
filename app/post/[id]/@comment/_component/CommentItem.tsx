import type { ComponentProps } from "react";

import type { CommentInfo } from "#lib/types/response.js";

interface CommentItemProps extends ComponentProps<"li"> {
  comment: CommentInfo;
}

export default function CommentItem({
  comment,
  className = "",
  ...props
}: CommentItemProps) {
  return <li className={`${className}`} {...props}></li>;
}
