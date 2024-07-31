"use client";

import { deleteCommentAction } from "#lib/actions/comment/deleteCommentAction.js";
import useDeleteAction from "#lib/hooks/useDeleteAction.js";
import type { CommentInfo } from "#lib/types/response.js";
import AuthorTag from "#ui/AuthorTag/AuthorTag.jsx";
import MutationButtonGroup from "#ui/MutationButtonGroup/MutationButtonGroup.jsx";

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
  const [deleteState, deleteFormAction] = useDeleteAction(
    deleteCommentAction.bind(null, id)
  );

  const isDebate = status === "debate";

  return (
    <section className="flex justify-between">
      <h3
        className={`ml-1 font-bold ${isDebate ? "text-rose-600" : "text-lime-600"}`}>
        {userName}
      </h3>
      <div className="flex max-2xs:flex-col-reverse max-2xs:gap-1">
        {isMine && (
          <form action={deleteFormAction}>
            <MutationButtonGroup
              updateClicked={updateClicked}
              onUpdateClick={onUpdateClick}
              deleteState={deleteState}
            />
          </form>
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
