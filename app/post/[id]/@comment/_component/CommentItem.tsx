"use client";

import { useRouter } from "next/navigation";
import { type ComponentProps, useEffect, useState } from "react";
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
      <div className="mb-3 grow flex-col">
        <div className="flex justify-between">
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
        </div>
        {updateClicked ? (
          <UpdateForm
            comment={{ id, content, images }}
            isDebate={isDebate}
            setUpdateClicked={setUpdateClicked}
          />
        ) : (
          <p className="py-2">{content}</p>
        )}
      </div>
    </li>
  );
}
