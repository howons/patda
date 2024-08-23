"use server";

import { NoResultError } from "kysely";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "#auth";
import { ERROR } from "#lib/constants/messages.js";
import { PLATFORM_ID } from "#lib/constants/platform.js";
import { TAG_ID } from "#lib/constants/tag.js";
import { getPost, updatePost, type UpdatePostData } from "#lib/database/posts";
import type { ActionState } from "#lib/types/action.js";
import { getFieldArrayFormData } from "#lib/utils/action.js";

const formSchema = z
  .object({
    platform: z.nativeEnum(PLATFORM_ID),
    targetNickname: z.string().min(1, ERROR.POST.NO_TARGET_NICKNAME),
    tag: z.nativeEnum(TAG_ID),
    content: z.string().min(30, ERROR.POST.SHORT_CONTENT),
    images: z
      .array(z.object({ path: z.string() }))
      .min(1, ERROR.IMAGE.NO_IMAGES),
    etcPlatformName: z.string().nullish(),
    additionalInfo: z.string().nullish(),
  })
  .refine(
    (data) => {
      if (data.platform === "etc") {
        return data.etcPlatformName != null && data.etcPlatformName.length > 0;
      }
      return true;
    },
    { path: ["etcPlatformName"], message: ERROR.POST.NO_ETC_PLATFORM_NAME }
  );

export type PostUpdateFormValues = z.infer<typeof formSchema>;

export async function updatePostAction(
  id: number,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await auth();

  const post = await getPost(id);
  if (post.userId != session?.user?.id) {
    return {
      status: "ERROR_AUTH",
      message: ERROR.POST.NO_AUTH,
    };
  }

  const input = formSchema.safeParse({
    platform: formData.get("platform"),
    targetNickname: formData.get("targetNickname"),
    tag: formData.get("tag"),
    images: getFieldArrayFormData("images", "path", formData),
    content: formData.get("content"),
    etcPlatformName: formData.get("etcPlatformName"),
    additionalInfo: formData.get("additionalInfo"),
  });

  if (!input.success) {
    const { fieldErrors } = input.error.flatten();
    return {
      status: "ERROR_VALIDATE",
      fieldErrors,
    };
  }

  const { images, etcPlatformName, additionalInfo, ...restData } = input.data;

  const newPostData: UpdatePostData = {
    images: images.map(({ path }) => path),
    etcPlatformName: etcPlatformName ?? null,
    additionalInfo: additionalInfo ?? null,
    ...restData,
  };

  try {
    var result = await updatePost(id, newPostData);
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

  revalidatePath(`/post/${id}`);

  return {
    status: "SUCCESS",
    message: `${result.numUpdatedRows}개 게시글 수정 완료`,
  };
}
