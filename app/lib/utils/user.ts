import type { Session } from "next-auth";

import type { ProfileData } from "#lib/database/users.js";
import type { Platform } from "#lib/types/property.js";

export function getUserKey(session: Session) {
  const userNameKey = encodeURIComponent(session.user?.name ?? "").replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  const userId = session.user?.id ?? "";

  return `${userNameKey}${userId.slice(0, 5)}`;
}

export function parsePlatformUserInfo(
  platform: Platform,
  profile?: Omit<ProfileData, "userId">
) {
  let nickname = "";
  let additionalInfo = "";
  let etcPlatformName: string | undefined;

  if (profile) {
    switch (platform) {
      case "daangn":
        nickname = profile.daangnNickname ?? "";
        additionalInfo = profile.daangnInfo ?? "";
        break;
      case "bunjang":
        nickname = profile.bunjangNickname ?? "";
        additionalInfo = profile.bunjangInfo ?? "";
        break;
      case "joongna":
        nickname = profile.joongnaNickname ?? "";
        additionalInfo = profile.joongnaInfo ?? "";
        break;
      default:
        nickname = profile.etcNickname ?? "";
        additionalInfo = profile.etcInfo ?? "";
        etcPlatformName = profile.etcPlatformName ?? "";
        break;
    }
  }

  return { nickname, additionalInfo, etcPlatformName };
}
