"use client";

import { useState } from "react";

import { PLATFORM_COLOR, PLATFORM_ID } from "#lib/constants/platform.js";
import type { Platform } from "#lib/types/property.js";
import Logo from "#public/당근빳다.svg";
import { labelVariants } from "#ui/formItems/Label.jsx";
import CategoryItem from "#ui/SearchBar/CategoryItem.jsx";
import { cn } from "#utils/utils.js";

const PLATFORMS = [...Object.values(PLATFORM_ID)];

export default function PlatformProfiles() {
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
        return (
          <CategoryItem
            key={platform}
            platform={platform}
            isActive={isTarget}
            className={cn(
              "transition-transform duration-300 ease-out cursor-pointer",
              isTarget ? "-rotate-45 hover:-rotate-[39deg]" : "hover:-rotate-6"
            )}
            onClick={() => setTargetPlatform(!isTarget ? platform : null)}
          />
        );
      })}
    </>
  );
}
