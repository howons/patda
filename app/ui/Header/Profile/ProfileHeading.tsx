"use client";

import { MenuHeading } from "@headlessui/react";

import type { ProfileData } from "#lib/database/users.js";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import { parsePlatformUserInfo } from "#lib/utils/user.js";

interface ProfileHeadingProps {
  profileData?: Omit<ProfileData, "userId">;
}

export default function ProfileHeading({ profileData }: ProfileHeadingProps) {
  const platform = usePlatformStore((store) => store.platform);
  const userNickname = profileData
    ? parsePlatformUserInfo(platform, profileData).nickname
    : null;

  return (
    <MenuHeading className="mb-2 text-sm opacity-50">
      {userNickname
        ? `${userNickname} 님`
        : "마이페이지에서 닉네임을 설정해주세요"}
    </MenuHeading>
  );
}
