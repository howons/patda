"use client";

import type { ComponentProps } from "react";

import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import { labelVariants } from "#ui/formItems/Label.jsx";
import { cn } from "#utils/utils.js";

interface MyPostListProps extends ComponentProps<"section"> {}

export default function MyPostList({ ...props }: MyPostListProps) {
  const platform = usePlatformStore((store) => store.platform);

  return (
    <section {...props}>
      <h1
        className={cn(
          labelVariants({ colorStyle: PLATFORM_COLOR[platform], size: "2xl" }),
          "group flex h-12 transition-colors duration-300"
        )}>
        내가 작성한 게시글
      </h1>
    </section>
  );
}
