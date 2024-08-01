"use client";

import { useCommentStatusStore } from "#lib/providers/CommentStatusStoreProvider.jsx";
import SideLine, { type SideLineProps } from "#ui/SIdeLine/SideLine.jsx";

interface CommentLineProps extends Omit<SideLineProps, "color"> {}

export default function CommentLine({
  topDotSize,
  bottomDotSize,
  className = "",
  ...props
}: CommentLineProps) {
  const commentStatus = useCommentStatusStore((store) => store.commentStatus);
  const isDebate = commentStatus === "debate";

  return (
    <SideLine
      color={isDebate ? "rose" : "lime"}
      topDotSize={topDotSize}
      bottomDotSize={bottomDotSize}
      className={className}
      {...props}
    />
  );
}
