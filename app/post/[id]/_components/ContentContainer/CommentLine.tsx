"use client";

import { useCommentStatusStore } from "#lib/providers/CommentStatusStoreProvider.jsx";
import Dot from "#ui/Dot/Dot.jsx";

export default function CommentLine() {
  const commentStatus = useCommentStatusStore((store) => store.commentStatus);
  const isDebate = commentStatus === "debate";

  return (
    <div className="ml-2.5 flex shrink-0 grow-0 basis-5 flex-col items-center justify-center pt-2">
      <Dot color={isDebate ? "rose" : "lime"} className="transition-colors" />
      <div
        className={`grow border-l transition-colors ${isDebate ? "border-rose-300" : "border-lime-300"}`}
      />
      <Dot color={isDebate ? "rose" : "lime"} className="transition-colors" />
    </div>
  );
}
