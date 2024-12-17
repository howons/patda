"use client";

import { useState } from "react";

import { PLATFORM_COLOR, PLATFORM_ID } from "#lib/constants/platform.js";
import type { Platform } from "#lib/types/property.js";
import Logo from "#public/당근빳다.svg";
import CategoryItem from "#ui/SearchBar/CategoryItem.jsx";

const PLATFORMS = [...Object.values(PLATFORM_ID)];

export default function PlatformProfiles() {
  const [targetPlatform, setTargetPlatform] = useState<Platform | null>(null);
  const color = PLATFORM_COLOR[targetPlatform || "daangn"];

  return (
    <>
      <h1 className="group flex h-12 break-keep">
        프로필
        <Logo className="ml-1 size-8 origin-[25%_75%] group-hover:animate-swing" />
      </h1>
      {PLATFORMS.map((platform) => (
        <CategoryItem key={platform} platform={platform} />
      ))}
    </>
  );
}
