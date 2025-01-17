"use server";

import { NoResultError } from "kysely";
import { z } from "zod";

import { auth } from "#auth";
import { ERROR } from "#lib/constants/messages.js";
import { createComment, type NewCommentData } from "#lib/database/comments";
import type { ActionState } from "#lib/types/action.js";
import type { PostCommentStatus } from "#lib/types/property.js";
import { getFieldArrayFormData } from "#lib/utils/action.js";
import { getImagePath } from "#lib/utils/supabase/imagePath.js";
import { moveImages, removeImages } from "#lib/utils/supabase/images.js";

const INPUT_STATUS: { [key: number]: PostCommentStatus } = [
  "normal",
  "debate",
] as const;

const formSchema = z.object({
  content: z.string().min(2, ERROR.POST.SHORT_CONTENT),
  images: z.array(z.object({ name: z.string() })),
  status: z.nativeEnum(INPUT_STATUS).nullish(),
});

export type CommentFormValues = z.infer<typeof formSchema>;

export async function createCommentAction(
  postId: number,
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
    content: formData.get("content"),
    images: getFieldArrayFormData("images", "name", formData),
    status: formData.get("status"),
  });

  if (!input.success) {
    const { fieldErrors } = input.error.flatten();
    return {
      status: "ERROR_VALIDATE",
      fieldErrors,
    };
  }

  const { images, status, ...restData } = input.data;

  const newCommentData: NewCommentData = {
    postId,
    userId: session.user.id,
    images: images.map(({ name }) => name),
    status: status ?? "normal",
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
        message: ERROR.COMMENT.NO_RESULT_DB,
      };
    }
  }

  await moveImages(
    images,
    getImagePath({ session, postId }),
    `comment/${result.id}`
  );
  removeImages(getImagePath({ session, postId }));

  return {
    status: "SUCCESS",
    message: "댓글 생성 완료",
    resultId: result.id,
  };
}
