"use client";

import type { ComponentProps } from "react";

import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import useInfiniteSearch from "#lib/hooks/useInfiniteSearch.js";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import { postDataToJSX } from "#lib/utils/post.jsx";
import Divider from "#ui/Divider/Divider.jsx";
import { labelVariants } from "#ui/formItems/Label.jsx";
import MoreButton from "#ui/SearchList/MoreButton.jsx";
import { cn } from "#utils/utils.js";

interface MyPostListProps extends ComponentProps<"section"> {}

export default function MyPostList({ ...props }: MyPostListProps) {
  const platform = usePlatformStore((store) => store.platform);

  const { state, size, setSize } = useInfiniteSearch({
    url: "/api/v1/posts/me",
  });

  const handleMoreClick = () => {
    setSize(size + 1);
  };

  const Posts = postDataToJSX(state);

  return (
    <section {...props}>
      <h1
        className={cn(
          labelVariants({ colorStyle: PLATFORM_COLOR[platform], size: "2xl" }),
          "group flex h-12 transition-colors duration-300"
        )}>
        내가 작성한 게시글
      </h1>
      <ul className="flex w-full max-w-3xl flex-col" aria-label="내글목록">
        <Divider direction="horizon" />
        {Posts}
        <MoreButton status={state.status} onClick={handleMoreClick} />
      </ul>
    </section>
  );
}
