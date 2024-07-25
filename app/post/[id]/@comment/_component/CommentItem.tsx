"use client";

import { Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

import MutationButtonGroup from "#app/post/[id]/@comment/_component/MutationButtonGroup.jsx";
import UpdateForm from "#app/post/[id]/@comment/_component/UpdateForm.jsx";
import { deleteCommentAction } from "#lib/actions/deleteCommentAction.js";
import type { CommentInfo } from "#lib/types/response.js";
import AuthorTag from "#ui/AuthorTag/AuthorTag.jsx";
import SideLine from "#ui/SIdeLine/SideLine.jsx";

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
  const [deleteState, deleteFormAction] = useFormState(
    deleteCommentAction.bind(null, id),
    { status: null }
  );
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInitHeight = useRef(0);

  useEffect(() => {
    if (!contentRef.current) return;
    contentInitHeight.current = contentRef.current.clientHeight;
    console.log(contentInitHeight.current);
  }, []);

  useEffect(() => {
    if (!deleteState) return;

    if (deleteState.status === "SUCCESS") {
      router.refresh();
    }
  }, [deleteState, router]);

  const isDebate = status === "debate";

  return (
    <li className={`flex min-h-20 ${className}`} {...props}>
      <SideLine
        color={isDebate ? "rose" : "lime"}
        topDotSize={isDebate ? "md" : "sm"}
        bottomDotSize={isLast ? "sm" : undefined}
      />
      <article className="mb-3 grow flex-col overflow-auto">
        <section className="flex justify-between">
          <h3
            className={`ml-1 font-bold ${isDebate ? "text-rose-600" : "text-lime-600"}`}>
            {userName}
          </h3>
          <div className="flex">
            {isMine && (
              <MutationButtonGroup
                updateClicked={updateClicked}
                setUpdateClicked={setUpdateClicked}
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
          ref={contentRef}
          className={`transtion duration-500 ease-linear ${updateClicked ? "max-h-60" : getContentMaxHeight(contentInitHeight.current)}`}>
          {updateClicked ? (
            <UpdateForm
              comment={{ id, content, images }}
              isDebate={isDebate}
              setUpdateClicked={setUpdateClicked}
            />
          ) : (
            <p className={`py-2`}>{content}</p>
          )}
        </section>
      </article>
    </li>
  );
}

function getContentMaxHeight(initHeight: number) {
  if (initHeight <= 40) return "max-h-10";
  if (initHeight <= 80) return "max-h-20";
  if (initHeight <= 120) return "max-h-[7.5rem]";
  if (initHeight <= 160) return "max-h-40";
  if (initHeight <= 200) return "max-h-[12.5rem]";
  if (initHeight <= 240) return "max-h-60";
  if (initHeight <= 280) return "max-h-[17.5rem]";
  if (initHeight <= 320) return "max-h-80";
  if (initHeight <= 360) return "max-h-[22.5rem]";
  if (initHeight <= 400) return "max-h-[25rem]";
  if (initHeight <= 440) return "max-h-[27.5rem]";
  if (initHeight <= 480) return "max-h-[30rem]";
  return "max-h-[60rem]";
}
