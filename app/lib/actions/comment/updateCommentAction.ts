"use server";

import { NoResultError } from "kysely";
import { z } from "zod";

import { auth } from "#auth";
import { ERROR } from "#lib/constants/messages.js";
import {
  getComment,
  updateComment,
  type UpdateCommentData,
} from "#lib/database/comments";
import type { ActionState } from "#lib/types/action.js";
import { getFieldArrayFormData } from "#lib/utils/action.js";

const formSchema = z.object({
  content: z.string().min(2, ERROR.POST.SHORT_CONTENT),
  images: z.array(z.object({ name: z.string() })),
});

export type CommentUpdateFormValues = z.infer<typeof formSchema>;

export async function updateCommentAction(
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

  const input = formSchema.safeParse({
    content: formData.get("content"),
    images: getFieldArrayFormData("images", "name", formData),
  });

  if (!input.success) {
    const { fieldErrors } = input.error.flatten();
    return {
      status: "ERROR_VALIDATE",
      fieldErrors,
    };
  }

  const { images, content } = input.data;

  const updateCommentData: UpdateCommentData = {
    content: content,
    images: images.map(({ name }) => name),
  };

  try {
    var result = await updateComment(id, updateCommentData);
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
    message: `${result.numUpdatedRows}개 댓글 수정 완료`,
  };
}
