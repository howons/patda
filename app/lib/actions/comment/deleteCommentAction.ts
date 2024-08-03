"use server";

import { NoResultError } from "kysely";

import { auth } from "#auth";
import { ERROR } from "#lib/constants/messages.js";
import { deleteComment, getComment } from "#lib/database/comments";
import type { ActionState } from "#lib/types/action.js";

export async function deleteCommentAction(
  id: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      status: "ERROR_AUTH",
      message: ERROR.COMMENT.NO_AUTH,
    };
  }

  const comment = await getComment(id);

  if (session.user.id !== comment?.userId) {
    return {
      status: "ERROR_AUTH",
      message: ERROR.COMMENT.NO_MATCH_AUTH,
    };
  }

  try {
    var result = await deleteComment(id);
  } catch (error) {
    console.error(error);
    if (error instanceof NoResultError) {
      return {
        status: "ERROR_DATABASE",
        message: ERROR.COMMENT.NO_RESULT_DB,
      };
    } else {
      return {
        status: "ERROR_INTERNAL",
        message: ERROR.COMMENT.NO_RESULT_DB,
      };
    }
  }

  return {
    status: "SUCCESS",
    message: `${result.numDeletedRows}개 댓글 제거 완료`,
  };
}
