"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import Button from "#ui/Button/Button.jsx";

function PostCreateButton() {
  const pathname = usePathname();
  const platform = usePlatformStore((store) => store.platform);

  const mediaStyle = pathname === "/" ? "sm:block" : "lg:block";

  return (
    <Link href="/post/create">
      <Button
        color={PLATFORM_COLOR[platform]}
        theme="primary"
        className={`ml-4 hidden cs:h-10 ${mediaStyle}`}>
        글 작성
      </Button>
    </Link>
  );
}

export default PostCreateButton;
