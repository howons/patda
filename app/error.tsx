"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import Button from "#ui/Button/Button.jsx";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-5 pt-7">
      <h1 className="text-lg font-bold">죄송하게도 에러가 발생했습니다..</h1>
      <Image src="/error.jpg" alt="error" width={400} height={300} />
      <Button className="px-7" onClick={() => reset()}>
        새로고침 해보기
      </Button>
      <Link href="/">
        <Button className="px-7" intent="primary">
          홈페이지로 돌아가기
        </Button>
      </Link>
    </div>
  );
}
