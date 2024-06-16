"use server";

import { PLATFORM_ID } from "@lib/constants/platform";
import { TAG_ID } from "@lib/constants/tag";
import { z } from "zod";

const formSchema = z.object({
  platform: z.nativeEnum(PLATFORM_ID),
  targetNickname: z.string(),
  tags: z.nativeEnum(TAG_ID),
  imageUrls: z.array(z.string()),
  content: z.string(),
  anonymousUserNickname: z.string().nullable(),
  etcPlatformName: z.string().nullable(),
});

export type FormValues = z.infer<typeof formSchema>;

export type State = {
  status: "success";
  message: string;
} | null;

export async function createPost(
  prevState: State,
  formData: FormData
): Promise<State> {
  const input = formSchema.safeParse({
    platform: formData.get("platform"),
    targetNickname: formData.get("targetNickname"),
  });

  return {
    status: "success",
    message: "test",
  };
}
