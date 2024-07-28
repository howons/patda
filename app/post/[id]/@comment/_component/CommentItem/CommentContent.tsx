"use client";

import { useEffect, useRef, useState } from "react";

import MoreButton from "#app/post/[id]/@comment/_component/CommentItem/MoreButton.jsx";
import UpdateForm from "#app/post/[id]/@comment/_component/UpdateForm.jsx";
import type { CommentInfo } from "#lib/types/response.js";

const CONTENT_HEIGHT_GAP = 40;
const CONTENT_MAX_HEIGHT = 10 * CONTENT_HEIGHT_GAP;

interface CommentContentProps {
  comment: CommentInfo;
  updateClicked: boolean;
  onUpdateClick: (value: boolean) => void;
  updateTransitioning: boolean;
  moreClicked: boolean;
  onMoreClick: () => void;
}

export default function CommentContent({
  comment: { id, content, images, status },
  updateClicked,
  onUpdateClick,
  updateTransitioning,
  moreClicked,
  onMoreClick,
}: CommentContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;

    setContentHeight(contentRef.current.scrollHeight);
  }, []);

  useEffect(() => {
    if (!updateClicked || !contentRef.current?.parentElement) return;

    contentRef.current.parentElement.scrollTo({ top: 0 });
  }, [updateClicked]);

  let contentHeightStyle = "";
  if (updateClicked) {
    contentHeightStyle = updateTransitioning ? "max-h-60" : "max-h-[50rem]";
  } else {
    contentHeightStyle = moreClicked
      ? "max-h-[50rem]"
      : getContentHeight(contentHeight);
  }

  const transitionEnabled =
    (!updateClicked && !updateTransitioning) ||
    (updateClicked && updateTransitioning);

  const moreEnabled = contentHeight >= CONTENT_MAX_HEIGHT && !updateClicked;

  const isDebate = status === "debate";

  return (
    <section
      className={`${updateTransitioning ? "overflow-hidden" : "overflow-auto"}`}>
      <div
        ref={contentRef}
        className={`${transitionEnabled ? "transtion duration-300 ease-out" : ""} ${contentHeightStyle}`}>
        {updateClicked ? (
          <UpdateForm
            comment={{ id, content, images }}
            isDebate={isDebate}
            onUpdateClick={onUpdateClick}
            className={`${updateTransitioning ? "pb-[35rem]" : "pb-0"}`}
          />
        ) : (
          <p className={`py-2`}>{content}</p>
        )}
        {moreEnabled && (
          <MoreButton isActive={moreClicked} onClick={onMoreClick} />
        )}
      </div>
    </section>
  );
}

function getContentHeight(height: number) {
  if (height <= 0) return "max-h-[25rem]";
  if (height <= 1 * CONTENT_HEIGHT_GAP) return "max-h-10";
  if (height <= 2 * CONTENT_HEIGHT_GAP) return "max-h-20";
  if (height <= 3 * CONTENT_HEIGHT_GAP) return "max-h-[7.5rem]";
  if (height <= 4 * CONTENT_HEIGHT_GAP) return "max-h-40";
  if (height <= 5 * CONTENT_HEIGHT_GAP) return "max-h-[12.5rem]";
  if (height <= 6 * CONTENT_HEIGHT_GAP) return "max-h-60";
  if (height <= 7 * CONTENT_HEIGHT_GAP) return "max-h-[17.5rem]";
  if (height <= 8 * CONTENT_HEIGHT_GAP) return "max-h-80";
  if (height <= 9 * CONTENT_HEIGHT_GAP) return "max-h-[22.5rem]";
  return "max-h-[25rem]";
}
