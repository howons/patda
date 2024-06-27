"use server";

import { NoResultError } from "kysely";
import { z } from "zod";

import { auth } from "#auth";
import { ERROR } from "#lib/constants/messages";
import { PLATFORM_ID } from "#lib/constants/platform";
import { TAG_ID } from "#lib/constants/tag";
import { createPost, type NewPostData } from "#lib/database/posts.js";
import { ActionState } from "#lib/types/action";

const baseSchema = z
  .object({
    platform: z.nativeEnum(PLATFORM_ID),
    targetNickname: z.string().min(1, ERROR.NO_TARGET_NICKNAME),
    tag: z.nativeEnum(TAG_ID),
    content: z.string().min(30, ERROR.SHORT_CONTENT),
    images: z.array(z.object({ id: z.string() })).nullish(),
    anonymousUserNickname: z.string().nullish(),
    etcPlatformName: z.string().nullish(),
  })
  .refine(
    (data) => {
      if (data.platform === "etc") {
        return data.etcPlatformName != null && data.etcPlatformName.length > 0;
      }
      return true;
    },
    { path: ["etcPlatformName"], message: ERROR.NO_ETC_PLATFORM_NAME }
  );

export type FormValues = z.infer<typeof baseSchema>;

export async function createPostAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await auth();

  const formSchema = baseSchema.refine(
    (data) => {
      if (!session) {
        return (
          data.anonymousUserNickname != null &&
          data.anonymousUserNickname.length > 0
        );
      }
      return true;
    },
    {
      path: ["anonymousUserNickname"],
      message: ERROR.NO_USER_NICKNAME,
    }
  );

  const input = formSchema.safeParse({
    platform: formData.get("platform"),
    targetNickname: formData.get("targetNickname"),
    tag: formData.get("tag"),
    images: formData.get("images"),
    content: formData.get("content"),
    anonymousUserNickname: formData.get("anonymousUserNickname"),
    etcPlatformName: formData.get("etcPlatformName"),
  });

  if (!input.success) {
    const { fieldErrors } = input.error.flatten();
    return {
      status: "ERROR_VALIDATE",
      fieldErrors,
    };
  }

  const { images, anonymousUserNickname, etcPlatformName, ...restData } =
    input.data;

  const newPostData: NewPostData = {
    userId: session?.user?.id ?? null,
    images: images?.map(({ id }) => id) ?? null,
    anonymousUserNickname: anonymousUserNickname ?? null,
    etcPlatformName: etcPlatformName ?? null,
    ...restData,
  };

  try {
    var result = await createPost(newPostData);
  } catch (error) {
    console.error(error);
    if (error instanceof NoResultError) {
      return {
        status: "ERROR_DATABASE",
        message: ERROR.NO_RESULT_DB,
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
    message: "포스트 생성 완료",
    resultId: result.id,
  };
}
