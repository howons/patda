"use client";

import type { ComponentProps } from "react";

import type { CommentInfo } from "#lib/types/response.js";
import AuthorTag from "#ui/AuthorTag/AuthorTag.jsx";
import SideLine from "#ui/SIdeLine/SideLine.jsx";

interface CommentItemProps extends ComponentProps<"li"> {
  comment: CommentInfo;
  isMine: boolean;
  isLast?: boolean;
}

export default function CommentItem({
  comment: { status, content, userName, createdAt },
  isMine,
  isLast,
  className = "",
  ...props
}: CommentItemProps) {
  const isDebate = status === "debate";

  return (
    <li className={`flex min-h-20 ${className}`} {...props}>
      <SideLine
        color={isDebate ? "rose" : "lime"}
        topDotSize={isDebate ? "md" : "sm"}
        bottomDotSize={isLast ? "sm" : undefined}
      />
      <div className="mb-5 grow flex-col">
        <div className="flex justify-between">
          <h3
            className={`ml-1 font-bold ${isDebate ? "text-rose-600" : "text-lime-600"}`}>
            {userName}
          </h3>
          <div className="flex">
            {isMine && (
              <>
                <button className="px-1.5 text-sm text-neutral-400 hover:text-neutral-600">
                  수정
                </button>
                <button className="px-1.5 text-sm text-neutral-400 hover:text-neutral-600">
                  삭제
                </button>
              </>
            )}
            <AuthorTag
              name={""}
              color={isDebate ? "rose" : "lime"}
              date={createdAt}
              className=""
            />
          </div>
        </div>
        <p className="py-2">{content}</p>
      </div>
    </li>
  );
}
