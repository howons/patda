"use client";

import { useRouter } from "next/navigation";
import {
  type ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormState } from "react-dom";

import MutationButtonGroup from "#app/post/[id]/@comment/_component/MutationButtonGroup.jsx";
import UpdateForm from "#app/post/[id]/@comment/_component/UpdateForm.jsx";
import { deleteCommentAction } from "#lib/actions/deleteCommentAction.js";
import type { CommentInfo } from "#lib/types/response.js";
import AuthorTag from "#ui/AuthorTag/AuthorTag.jsx";
import SideLine from "#ui/SIdeLine/SideLine.jsx";

const CONTENT_HEIGHT_GAP = 40;
const CONTENT_MAX_HEIGHT = 10 * CONTENT_HEIGHT_GAP;
const TRANSTION_DELAY = 300;

interface CommentItemProps extends ComponentProps<"li"> {
  comment: CommentInfo;
  isMine: boolean;
  isLast?: boolean;
}

export default function CommentItem({
  comment: { id, status, content, userName, images, createdAt },
  isMine,
  isLast,
  className = "",
  ...props
}: CommentItemProps) {
  const [updateClicked, setUpdateClicked] = useState(false);
  const [moreClicked, setMoreClicked] = useState(false);
  const [updateTransitioning, setUpdateTransitioning] = useState(false);
  const router = useRouter();

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;

    setContentHeight(contentRef.current.scrollHeight);
  }, []);

  const [deleteState, deleteFormAction] = useFormState(
    deleteCommentAction.bind(null, id),
    { status: null }
  );

  useEffect(() => {
    if (!deleteState) return;

    if (deleteState.status === "SUCCESS") {
      router.refresh();
    }
  }, [deleteState, router]);

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

  useEffect(() => {
    if (!updateClicked || !contentRef.current?.parentElement) return;

    contentRef.current.parentElement.scrollTo({ top: 0 });
  }, [updateClicked]);

  const isDebate = status === "debate";

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

  return (
    <li className={`flex min-h-20 ${className}`} {...props}>
      <SideLine
        color={isDebate ? "rose" : "lime"}
        topDotSize={isDebate ? "md" : "sm"}
        bottomDotSize={isLast ? "sm" : undefined}
      />
      <article className="relative mb-3 grow flex-col">
        <section className="flex justify-between">
          <h3
            className={`ml-1 font-bold ${isDebate ? "text-rose-600" : "text-lime-600"}`}>
            {userName}
          </h3>
          <div className="flex">
            {isMine && (
              <MutationButtonGroup
                updateClicked={updateClicked}
                onUpdateClick={handleUpdateClick}
                deleteAction={deleteFormAction}
                deleteState={deleteState}
              />
            )}
            <AuthorTag
              name={""}
              color={isDebate ? "rose" : "lime"}
              date={createdAt}
              className=""
            />
          </div>
        </section>
        <section
          className={`${updateTransitioning ? "overflow-hidden" : "overflow-auto"}`}>
          <div
            ref={contentRef}
            className={`${transitionEnabled ? "transtion duration-300 ease-out" : ""} ${contentHeightStyle}`}>
            {updateClicked ? (
              <UpdateForm
                comment={{ id, content, images }}
                isDebate={isDebate}
                onUpdateClick={handleUpdateClick}
                className={`${updateTransitioning ? "pb-[35rem]" : "pb-0"}`}
              />
            ) : (
              <p className={`py-2`}>{content}</p>
            )}
            {contentHeight >= CONTENT_MAX_HEIGHT && !updateClicked && (
              <button
                className="sticky bottom-0 left-0 h-12 w-full bg-gradient-to-t from-white to-white/0"
                onClick={() => setMoreClicked((m) => !m)}></button>
            )}
          </div>
        </section>
      </article>
    </li>
  );
}

function getContentHeight(height: number) {
  if (height <= 0) return "max-h-[50rem]";
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
