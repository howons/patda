"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import { useProfileRef } from "#lib/providers/ProfileRefProvider.jsx";
import Button from "#ui/Button/Button.jsx";
import { cn } from "#utils/utils.js";

interface PostCreateButtonProps {
  isLoggedIn: boolean;
}

export default function PostCreateButton({
  isLoggedIn,
}: PostCreateButtonProps) {
  const pathname = usePathname();
  const platform = usePlatformStore((store) => store.platform);
  const profileRef = useProfileRef();

  const mediaStyle = pathname === "/" ? "sm:block" : "lg:block";

  if (!isLoggedIn) {
    return (
      <Button
        colorStyle={PLATFORM_COLOR[platform]}
        intent="primary"
        className={cn("ml-4 hidden cs:h-10", mediaStyle)}
        onClick={() => {
          profileRef.current?.click();
        }}>
        글 작성
      </Button>
    );
  }

  return (
    <Link href="/post/create">
      <Button
        colorStyle={PLATFORM_COLOR[platform]}
        intent="primary"
        className={cn("ml-4 hidden cs:h-10", mediaStyle)}>
        글 작성
      </Button>
    </Link>
  );
}
