"use client";

import { deleteCommentAction } from "#lib/actions/comment/deleteCommentAction.js";
import useDeleteAction from "#lib/hooks/useDeleteAction.js";
import { useCommentContext } from "#lib/providers/CommentProvider.jsx";
import AuthorTag from "#ui/AuthorTag/AuthorTag.jsx";
import MutationButtonGroup from "#ui/MutationButtonGroup/MutationButtonGroup.jsx";
import { cn } from "#utils/utils.js";

interface CommentHeaderProps {
  isMine: boolean;
  updateClicked: boolean;
  onUpdateClick: (value: boolean) => void;
}

export default function CommentHeader({
  isMine,
  updateClicked,
  onUpdateClick,
}: CommentHeaderProps) {
  const { id, userName, status, createdAt } = useCommentContext();

  const [deleteState, deleteFormAction] = useDeleteAction(
    deleteCommentAction.bind(null, id)
  );

  const isDebate = status === "debate";

  return (
    <section className="flex justify-between">
      <h3
        className={cn(
          "ml-1 font-bold",
          isDebate ? "text-rose-600" : "text-lime-600"
        )}>
        {userName}
      </h3>
      <div className="flex max-2xs:flex-col-reverse max-2xs:gap-1">
        {isMine && (
          <form action={deleteFormAction} className="flex items-center">
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
        />
      </div>
    </section>
  );
}
