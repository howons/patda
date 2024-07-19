"use server";

import { NoResultError } from "kysely";
import { z } from "zod";

import { auth } from "#auth";
import { ERROR } from "#lib/constants/messages.js";
import { createComment, type NewCommentData } from "#lib/database/comments.js";
import type { ActionState } from "#lib/types/action.js";

const formSchema = z.object({
  postId: z.string(),
  content: z.string(),
  images: z.array(z.object({ id: z.string() })).nullish(),
});

export type FormValues = z.infer<typeof formSchema>;

export async function createPostAction(
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

  const input = formSchema.safeParse({
    postId: formData.get("postId"),
    content: formData.get("content"),
    images: formData.get("images"),
  });

  if (!input.success) {
    const { fieldErrors } = input.error.flatten();
    return {
      status: "ERROR_VALIDATE",
      fieldErrors,
    };
  }

  const { images, ...restData } = input.data;

  const newCommentData: NewCommentData = {
    userId: session.user.id,
    images: images?.map(({ id }) => id) ?? null,
    ...restData,
  };

  try {
    var result = await createComment(newCommentData);
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
        error: (error as { message: string })?.message ?? "",
      };
    }
  }

  return {
    status: "SUCCESS",
    message: "댓글 생성 완료",
    resultId: result.id,
  };
}
