import type { ComponentProps } from "react";

import type { CommentInfo } from "#lib/types/response.js";
import AuthorTag from "#ui/AuthorTag/AuthorTag.jsx";
import SideLine from "#ui/SIdeLine/SideLine.jsx";

interface CommentItemProps extends ComponentProps<"li"> {
  comment: CommentInfo;
}

export default function CommentItem({
  comment: { status, content, userName, createdAt },
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
      <div className="mb-5 grow flex-col">
        <div className="flex justify-between">
          <h3
            className={`ml-1 font-bold ${isDebate ? "text-rose-600" : "text-lime-600"}`}>
            {userName}
          </h3>
          <AuthorTag
            name={""}
            color={isDebate ? "rose" : "lime"}
            date={createdAt}
          />
        </div>
        <p className="py-2">{content}</p>
      </div>
    </li>
  );
}
