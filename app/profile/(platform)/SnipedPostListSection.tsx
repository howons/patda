"use client";

import type { ComponentProps } from "react";

import SnipedPostList from "#app/profile/(platform)/SnipedPostList.jsx";
import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import type { Database } from "#lib/database/db.js";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import { labelVariants } from "#ui/formItems/Label.jsx";
import { cn } from "#utils/utils.js";

interface SnipedPostListSectionProps extends ComponentProps<"section"> {
  profile?: Omit<Database["Profile"], "userId">;
}

export default function SnipedPostListSection({
  profile,
  ...props
}: SnipedPostListSectionProps) {
  const platform = usePlatformStore((store) => store.platform);

  return (
    <section {...props}>
      <h1
        className={cn(
          labelVariants({ colorStyle: PLATFORM_COLOR[platform], size: "2xl" }),
          "group flex h-12 transition-colors duration-300"
        )}>
        나를 저격한 게시글
      </h1>
      {profile && <SnipedPostList profile={profile} />}
    </section>
  );
}
