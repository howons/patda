"use client";

import { type ComponentProps, useCallback, useState } from "react";

import CommentContent from "#app/post/[id]/(comment)/_component/CommentItem/CommentContent.jsx";
import CommentHeader from "#app/post/[id]/(comment)/_component/CommentItem/CommentHeader.jsx";
import { useCommentContext } from "#lib/providers/CommentProvider.jsx";
import SideLine from "#ui/SIdeLine/SideLine.jsx";

const TRANSTION_DELAY = 300;

interface CommentItemProps extends ComponentProps<"li"> {
  isMine: boolean;
  isLast?: boolean;
}

export default function CommentItem({
  isMine,
  isLast,
  className = "",
  ...props
}: CommentItemProps) {
  const [updateClicked, setUpdateClicked] = useState(false);
  const [moreClicked, setMoreClicked] = useState(false);
  const [updateTransitioning, setUpdateTransitioning] = useState(false);

  const { status } = useCommentContext();

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

  const isDebate = status === "debate";

  return (
    <li className={`flex min-h-20 ${className}`} {...props}>
      <SideLine
        color={isDebate ? "rose" : "lime"}
        topDotSize={isDebate ? "md" : "sm"}
        bottomDotSize={isLast ? "sm" : undefined}
      />
      <article className="relative mb-3 grow flex-col">
        <CommentHeader
          isMine={isMine}
          updateClicked={updateClicked}
          onUpdateClick={handleUpdateClick}
        />
        <CommentContent
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
