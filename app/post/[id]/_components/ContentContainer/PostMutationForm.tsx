"use client";

import { deletePostAction } from "#lib/actions/post/deletePostAction.js";
import useDeleteAction from "#lib/hooks/useDeleteAction.js";
import MutationButtonGroup from "#ui/MutationButtonGroup/MutationButtonGroup.jsx";

interface PostMutationFormProps {
  postId: number;
}

export default function PostMutationForm({ postId }: PostMutationFormProps) {
  const [deleteState, deleteFormAction] = useDeleteAction(
    deletePostAction.bind(null, postId),
    "/"
  );

  return (
    <form action={deleteFormAction}>
      <MutationButtonGroup
        deleteState={deleteState}
        updateHref={`/post/update/${postId}`}
      />
    </form>
  );
}
