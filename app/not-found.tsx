import Image from "next/image";
import Link from "next/link";

import Button from "#ui/Button/Button.jsx";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-5 pt-7">
      <h1 className="text-lg font-bold">존재하지 않는 페이지입니다.</h1>
      <Image src="/404notFound.jpg" alt="not found" width={400} height={300} />
      <Link href="/">
        <Button className="px-7" intent="primary">
          홈페이지로 돌아가기
        </Button>
      </Link>
    </div>
  );
}
