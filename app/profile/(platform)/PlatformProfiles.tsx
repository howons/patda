"use client";

import { Button } from "@headlessui/react";
import { useState } from "react";

import ProfileForm from "#app/profile/(platform)/_component/ProfileForm.jsx";
import {
  PLATFORM_COLOR,
  PLATFORM_ID,
  PLATFORM_NAME,
} from "#lib/constants/platform.js";
import type { Database } from "#lib/database/db.js";
import type { Platform } from "#lib/types/property.js";
import Logo from "#public/당근빳다.svg";
import { labelVariants } from "#ui/formItems/Label.jsx";
import HelpCircle from "#ui/HelpCircle/HelpCircle.jsx";
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
    <section>
      <div className="flex justify-between">
        <h1
          className={cn(
            labelVariants({ colorStyle, size: "2xl" }),
            "group flex h-12 transition-colors duration-300"
          )}>
          프로필
          <Logo className="ml-1 size-8 origin-[25%_75%] group-hover:animate-swing" />
        </h1>
        <HelpCircle className="z-10 mx-2 mt-2">
          작성한 정보는 나를 저격한 게시글을 찾는데 사용됩니다.
        </HelpCircle>
      </div>
      {PLATFORMS.map((platform) => {
        const isTarget = targetPlatform === platform;

        const [nickname, additionalInfo, etcPlatformName] =
          parsePlatformUserInfo(platform, profile);

        return (
          <ProfileForm
            key={platform}
            platform={platform}
            isTarget={isTarget}
            setTargetPlatform={setTargetPlatform}
            nickname={nickname}
            additionalInfo={additionalInfo}
            etcPlatformName={etcPlatformName}
            className="flex items-center gap-6">
            <Button
              type="button"
              title={PLATFORM_NAME[platform]}
              onClick={() => setTargetPlatform(!isTarget ? platform : null)}
              className={cn(
                "transition-transform duration-300 ease-out",
                isTarget
                  ? "-rotate-45 hover:-rotate-[39deg]"
                  : "hover:-rotate-6"
              )}>
              <CategoryItem platform={platform} isActive={isTarget} />
            </Button>
          </ProfileForm>
        );
      })}
    </section>
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
