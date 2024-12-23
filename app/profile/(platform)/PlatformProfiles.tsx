"use client";

import { useState } from "react";

import PlatformUserInfo from "#app/profile/(platform)/_component/PlatformUserInfo.jsx";
import { PLATFORM_COLOR, PLATFORM_ID } from "#lib/constants/platform.js";
import type { Database } from "#lib/database/db.js";
import type { Platform } from "#lib/types/property.js";
import Logo from "#public/당근빳다.svg";
import EditButton from "#ui/Button/EditButton.jsx";
import { labelVariants } from "#ui/formItems/Label.jsx";
import CategoryItem from "#ui/SearchBar/CategoryItem.jsx";
import { cn } from "#utils/utils.js";

const PLATFORMS = [...Object.values(PLATFORM_ID)];

interface PlatformProfilesProp {
  profile?: Omit<Database["Profile"], "userId">;
}

export default function PlatformProfiles({ profile }: PlatformProfilesProp) {
  const [targetPlatform, setTargetPlatform] = useState<Platform | null>(null);
  const colorStyle = PLATFORM_COLOR[targetPlatform || "daangn"];

  return (
    <>
      <h1
        className={cn(
          labelVariants({ colorStyle, size: "2xl" }),
          "group flex h-12 transition-colors duration-300"
        )}>
        프로필
        <Logo className="ml-1 size-8 origin-[25%_75%] group-hover:animate-swing" />
      </h1>
      {PLATFORMS.map((platform) => {
        const isTarget = targetPlatform === platform;

        const [nickname, additionalInfo, etcPlatformName] =
          parsePlatformUserInfo(platform, profile);

        return (
          <form key={platform} className="flex items-center gap-6">
            <CategoryItem
              platform={platform}
              isActive={isTarget}
              className={cn(
                "transition-transform duration-300 ease-out cursor-pointer",
                isTarget
                  ? "-rotate-45 hover:-rotate-[39deg]"
                  : "hover:-rotate-6"
              )}
              onClick={() => setTargetPlatform(!isTarget ? platform : null)}
            />
            <PlatformUserInfo
              platform={platform}
              nickname={nickname}
              additionalInfo={additionalInfo}
              etcPlatformName={etcPlatformName}
              className="grow"
            />
            <EditButton
              isEdit={isTarget}
              platform={platform}
              onClick={() => setTargetPlatform(!isTarget ? platform : null)}
            />
          </form>
        );
      })}
    </>
  );
}

function parsePlatformUserInfo(
  platform: Platform,
  profile: PlatformProfilesProp["profile"]
): [string, string, string | undefined] {
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

  return [nickname, additionalInfo, etcPlatformName];
}
