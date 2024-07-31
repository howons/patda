"use client";

import { deletePostAction } from "#lib/actions/deletePostAction.js";
import useDeleteAction from "#lib/hooks/useDeleteAction.js";
import MutationButtonGroup from "#ui/MutationButtonGroup/MutationButtonGroup.jsx";

interface PostMutationFormProps {
  postId: string;
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
