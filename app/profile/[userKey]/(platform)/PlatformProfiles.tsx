"use client";

import { PLATFORM_ID } from "#lib/constants/platform.js";
import CategoryItem from "#ui/SearchBar/CategoryItem.jsx";

const PLATFORMS = [...Object.values(PLATFORM_ID)];

export default function PlatformProfiles() {
  return (
    <div>
      {PLATFORMS.map((platform) => (
        <CategoryItem key={platform} platform={platform} />
      ))}
    </div>
  );
}
