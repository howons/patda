"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import MutationButtonGroup from "#app/post/[id]/@comment/_component/MutationButtonGroup.jsx";
import { deleteCommentAction } from "#lib/actions/deleteCommentAction.js";
import type { CommentInfo } from "#lib/types/response.js";
import AuthorTag from "#ui/AuthorTag/AuthorTag.jsx";

interface CommentHeaderProps {
  isMine: boolean;
  comment: CommentInfo;
  updateClicked: boolean;
  onUpdateClick: (value: boolean) => void;
}

export default function CommentHeader({
  isMine,
  comment: { id, userName, status, createdAt },
  updateClicked,
  onUpdateClick,
}: CommentHeaderProps) {
  const router = useRouter();

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

  const isDebate = status === "debate";

  return (
    <section className="flex justify-between">
      <h3
        className={`ml-1 font-bold ${isDebate ? "text-rose-600" : "text-lime-600"}`}>
        {userName}
      </h3>
      <div className="flex max-2xs:flex-col-reverse max-2xs:gap-1">
        {isMine && (
          <MutationButtonGroup
            updateClicked={updateClicked}
            onUpdateClick={onUpdateClick}
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
  );
}
