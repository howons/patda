"use client";

import { MenuHeading } from "@headlessui/react";

import type { ProfileData } from "#lib/database/users.js";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import type { Platform } from "#lib/types/property.js";

interface ProfileHeadingProps {
  profileData?: Omit<ProfileData, "userId">;
}

export default function ProfileHeading({ profileData }: ProfileHeadingProps) {
  const platform = usePlatformStore((store) => store.platform);
  const userNickname = profileData
    ? getUserNickname(profileData, platform)
    : null;

  return (
    <MenuHeading className="mb-2 text-sm opacity-50">
      {userNickname
        ? `${userNickname} 님`
        : "마이페이지에서 닉네임을 설정해주세요"}
    </MenuHeading>
  );
}

function getUserNickname(
  profileData: Omit<ProfileData, "userId">,
  platform: Platform
) {
  switch (platform) {
    case "daangn":
      return profileData.daangnNickname;
    case "bunjang":
      return profileData.bunjangNickname;
    case "joongna":
      return profileData.joongnaNickname;
    case "etc":
      return profileData.etcNickname;
  }
}
