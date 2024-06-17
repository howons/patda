"use server";

import { PLATFORM_ID } from "@lib/constants/platform";
import { TAG_ID } from "@lib/constants/tag";
import { ActionState } from "@lib/types/action";
import { z } from "zod";

const formSchema = z.object({
  platform: z.nativeEnum(PLATFORM_ID),
  targetNickname: z.string(),
  tag: z.nativeEnum(TAG_ID),
  imageUrls: z.array(z.string()),
  content: z.string(),
  anonymousUserNickname: z.string().nullable(),
  etcPlatformName: z.string().nullable(),
});

export type FormValues = z.infer<typeof formSchema>;

export async function createPost(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const input = formSchema.safeParse({
    platform: formData.get("platform"),
    targetNickname: formData.get("targetNickname"),
    tag: formData.get("tag"),
    imageUrls: /*formData.get("imageUrls"),*/ [""],
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

  console.log(input.data);

  return {
    status: "SUCCESS",
    message: "포스트 생성 완료",
  };
}
