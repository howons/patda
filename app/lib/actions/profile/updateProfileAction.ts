"use server";

import { z } from "zod";

import { auth } from "#auth";
import { ERROR } from "#lib/constants/messages.js";
import { type ProfileData, upsertProfile } from "#lib/database/users.js";
import type { ActionState } from "#lib/types/action.js";
import type { Platform } from "#lib/types/property.js";

const formSchema = z.object({
  nickname: z.string().max(30, ERROR.PROFILE.MAX_NICKNAME),
  additionalInfo: z.string().max(30, ERROR.PROFILE.MAX_ADDITIONALINFO),
  etcPlatformName: z
    .string()
    .max(30, ERROR.PROFILE.MAX_ETC_PLATFORM_NAME)
    .nullish(),
});

export type ProfileFormValues = z.infer<typeof formSchema>;

export async function upsertProfileAction(
  platform: Platform,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      status: "ERROR_AUTH",
      message: ERROR.PROFILE.NO_AUTH,
    };
  }

  const input = formSchema.safeParse({
    nickname: formData.get("nickname"),
    additionalInfo: formData.get("additionalInfo"),
    etcPlatformName: formData.get("etcPlatformName"),
  });

  if (!input.success) {
    const { fieldErrors } = input.error.flatten();
    return {
      status: "ERROR_VALIDATE",
      fieldErrors,
    };
  }

  const { nickname, additionalInfo, etcPlatformName } = input.data;

  const profileData: Partial<ProfileData> = {
    userId,
  };

  if (platform === "daangn") {
    profileData.daangnInfo = additionalInfo;
    profileData.daangnNickname = nickname;
  } else if (platform === "bunjang") {
    profileData.bunjangInfo = additionalInfo;
    profileData.bunjangNickname = nickname;
  } else if (platform === "joongna") {
    profileData.joongnaInfo = additionalInfo;
    profileData.joongnaNickname = nickname;
  } else if (platform === "etc") {
    profileData.etcInfo = additionalInfo;
    profileData.etcNickname = nickname;
    profileData.etcPlatformName = etcPlatformName;
  }

  try {
    var result = await upsertProfile(profileData);
  } catch (error) {
    console.error(error);
    return {
      status: "ERROR_INTERNAL",
      message: ERROR.PROFILE.NO_RESULT_DB,
    };
  }

  return {
    status: "SUCCESS",
    message: "프로필 갱신 완료.",
  };
}
