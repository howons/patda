"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Button from "#ui/Button/Button";

function PostCreateButton() {
  const pathname = usePathname();

  const mediaStyle = pathname === "/" ? "sm:block" : "lg:block";

  return (
    <Link href="/post/create">
      <Button theme="primary" className={`ml-4 hidden cs:h-10 ${mediaStyle}`}>
        글 작성
      </Button>
    </Link>
  );
}

export default PostCreateButton;
