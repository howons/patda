"use client";

import { useEffect, useRef, useState } from "react";

import ImageCarousel from "#app/post/[id]/_components/ContentContainer/ImageCarousel.jsx";
import MoreButton from "#app/post/[id]/(comment)/_component/CommentItem/MoreButton.jsx";
import UpdateForm from "#app/post/[id]/(comment)/_component/UpdateForm.jsx";
import { useCommentContext } from "#lib/providers/CommentProvider.jsx";
import { getImagePath } from "#lib/utils/supabase/imagePath.js";

const CONTENT_HEIGHT_GAP = 40;
const CONTENT_MAX_HEIGHT = 10 * CONTENT_HEIGHT_GAP;

interface CommentContentProps {
  updateClicked: boolean;
  onUpdateClick: (value: boolean) => void;
  updateTransitioning: boolean;
  moreClicked: boolean;
  onMoreClick: () => void;
}

export default function CommentContent({
  updateClicked,
  onUpdateClick,
  updateTransitioning,
  moreClicked,
  onMoreClick,
}: CommentContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const { id, content, images, status } = useCommentContext();

  const isDebate = status === "debate";

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
    contentHeightStyle = updateTransitioning
      ? isDebate
        ? "max-h-96"
        : "max-h-60"
      : "max-h-[50rem]";
  } else {
    contentHeightStyle = moreClicked
      ? "max-h-[50rem]"
      : getContentHeight(contentHeight);
  }

  const transitionEnabled =
    (!updateClicked && !updateTransitioning) ||
    (updateClicked && updateTransitioning);

  const moreEnabled = contentHeight > CONTENT_MAX_HEIGHT && !updateClicked;

  return (
    <section
      className={`${updateTransitioning ? "overflow-hidden" : "overflow-auto"}`}>
      <div
        ref={contentRef}
        className={`${transitionEnabled ? "transtion duration-300 ease-out" : ""} ${contentHeightStyle}`}>
        {updateClicked ? (
          <UpdateForm
            isDebate={isDebate}
            onUpdateClick={onUpdateClick}
            className={`${updateTransitioning ? "pb-[35rem]" : "pb-0"}`}
          />
        ) : (
          <>
            <p className={`py-2`}>{content}</p>
            {images?.length > 0 && (
              <ImageCarousel
                images={images}
                imagePath={getImagePath({ commentId: id })}
                className="mx-12"
              />
            )}
          </>
        )}
        <MoreButton
          isActive={moreClicked}
          onClick={onMoreClick}
          className={`${moreEnabled ? "" : "hidden"}`}
        />
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
