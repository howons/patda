"use server";

import { NoResultError } from "kysely";

import { auth } from "#auth";
import { ERROR } from "#lib/constants/messages.js";
import { deletePost, getPost } from "#lib/database/posts";
import type { ActionState } from "#lib/types/action.js";

export async function deletePostAction(
  id: number,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await auth();
  const post = await getPost(id);

  if (!session?.user?.id) {
    return {
      status: "ERROR_AUTH",
      message: ERROR.POST.NO_AUTH,
    };
  }

  if (session.user.id !== post?.userId) {
    return {
      status: "ERROR_AUTH",
      message: ERROR.POST.NO_MATCH_AUTH,
    };
  }

  try {
    var result = await deletePost(id);
  } catch (error) {
    console.error(error);
    if (error instanceof NoResultError) {
      return {
        status: "ERROR_DATABASE",
        message: ERROR.POST.NO_RESULT_DB,
      };
    } else {
      return {
        status: "ERROR_INTERNAL",
        message: ERROR.POST.NO_RESULT_DB,
      };
    }
  }

  return {
    status: "SUCCESS",
    message: `${result.numDeletedRows}개 게시글 제거 완료`,
  };
}
