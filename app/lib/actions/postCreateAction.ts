"use server";

import { z } from "zod";

const formSchema = z.object({
  platform: z.enum(["daangn", "bunjang", "joongna", "etc"]),
  targetNickname: z.string(),
  tags: z.array(z.string()),
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
  console.log("server action", formData);

  return {
    status: "success",
    message: "test",
  };
}
