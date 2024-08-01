"use client";

import { type ComponentProps, useCallback, useState } from "react";

import CommentContent from "#app/post/[id]/(comment)/_component/CommentItem/CommentContent.jsx";
import CommentHeader from "#app/post/[id]/(comment)/_component/CommentItem/CommentHeader.jsx";
import type { CommentInfo } from "#lib/types/response.js";
import SideLine from "#ui/SIdeLine/SideLine.jsx";

const TRANSTION_DELAY = 300;

interface CommentItemProps extends ComponentProps<"li"> {
  comment: CommentInfo;
  isMine: boolean;
  isLast?: boolean;
}

export default function CommentItem({
  comment,
  isMine,
  isLast,
  className = "",
  ...props
}: CommentItemProps) {
  const [updateClicked, setUpdateClicked] = useState(false);
  const [moreClicked, setMoreClicked] = useState(false);
  const [updateTransitioning, setUpdateTransitioning] = useState(false);

  const handleUpdateClick = useCallback(
    (value: boolean) => {
      const setUpdate = (value: boolean) => {
        setUpdateClicked(value);

        setUpdateTransitioning(true);
        setTimeout(() => setUpdateTransitioning(false), TRANSTION_DELAY);
      };

      if (!value) {
        setUpdate(false);
        return;
      }

      if (!moreClicked) {
        setUpdate(true);
        return;
      }

      setMoreClicked(false);
      setTimeout(() => setUpdate(true), TRANSTION_DELAY);
    },
    [moreClicked]
  );

  const handleMoreClick = useCallback(() => setMoreClicked((m) => !m), []);

  const isDebate = comment.status === "debate";

  return (
    <li className={`flex min-h-20 ${className}`} {...props}>
      <SideLine
        color={isDebate ? "rose" : "lime"}
        topDotSize={isDebate ? "md" : "sm"}
        bottomDotSize={isLast ? "sm" : undefined}
      />
      <article className="relative mb-3 grow flex-col">
        <CommentHeader
          comment={comment}
          isMine={isMine}
          updateClicked={updateClicked}
          onUpdateClick={handleUpdateClick}
        />
        <CommentContent
          comment={comment}
          updateClicked={updateClicked}
          onUpdateClick={handleUpdateClick}
          updateTransitioning={updateTransitioning}
          moreClicked={moreClicked}
          onMoreClick={handleMoreClick}
        />
      </article>
    </li>
  );
}
