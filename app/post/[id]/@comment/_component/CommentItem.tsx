import type { ComponentProps } from "react";

import type { CommentInfo } from "#lib/types/response.js";
import SideLine from "#ui/SIdeLine/SideLine.jsx";

interface CommentItemProps extends ComponentProps<"li"> {
  comment: CommentInfo;
}

export default function CommentItem({
  comment: { status, content, userName },
  className = "",
  ...props
}: CommentItemProps) {
  const isDebate = status === "debate";

  return (
    <li className={`flex min-h-20 ${className}`} {...props}>
      <SideLine
        color={isDebate ? "rose" : "lime"}
        topDotSize={isDebate ? "md" : "sm"}
      />
      <div className="flex-col">
        <h3>{userName}</h3>
        <p>{content}</p>
      </div>
    </li>
  );
}
