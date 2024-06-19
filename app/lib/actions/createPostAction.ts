"use server";

import { PLATFORM_ID } from "@lib/constants/platform";
import { TAG_ID } from "@lib/constants/tag";
import { Database, db } from "@lib/database/db";
import { ActionState } from "@lib/types/action";
import { NoResultError } from "kysely";
import { z } from "zod";

import { auth } from "@/auth";

const baseSchema = z
  .object({
    platform: z.nativeEnum(PLATFORM_ID),
    targetNickname: z.string().min(1, "상대 닉네임을 적어주세요."),
    tag: z.nativeEnum(TAG_ID),
    imageUrls: z.array(z.string()),
    content: z.string().min(30, "내용은 최소 30자 이상 적어주세요."),
    anonymousUserNickname: z.string().nullable(),
    etcPlatformName: z.string().nullable(),
  })
  .refine(
    (data) => {
      if (data.platform === "etc") {
        return data.etcPlatformName != null && data.etcPlatformName.length > 0;
      }
      return true;
    },
    { path: ["etcPlatformName"], message: "거래 사이트의 이름을 적어주세요." }
  );

export type FormValues = z.infer<typeof baseSchema>;

export async function createPost(
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
      message: "거래 사이트에서 사용하는 본인 닉네임을 적어주세요.",
    }
  );

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

  const newPostData: Omit<
    Database["Post"],
    "id" | "status" | "createdAt" | "updatedAt"
  > = {
    userId: session?.user?.id ?? null,
    ...input.data,
  };

  try {
    var result = await db
      .insertInto("Post")
      .values(newPostData)
      .returning("id")
      .executeTakeFirstOrThrow();
  } catch (error) {
    console.error(error);
    if (error instanceof NoResultError) {
      return {
        status: "ERROR_DATABASE",
        message: "포스트 생성 오류",
      };
    } else {
      return {
        status: "ERROR_INTERNAL",
        error: "error",
      };
    }
  }

  return {
    status: "SUCCESS",
    message: "포스트 생성 완료",
    resultId: result.id,
  };
}
