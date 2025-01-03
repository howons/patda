import Link from "next/link";

import Dot from "#ui/Dot/Dot.jsx";

export default function Footer() {
  return (
    <div className="flex h-28 w-screen flex-col justify-between bg-neutral-200 p-5">
      <ul className="flex items-center gap-4">
        <li className="text-sm text-neutral-700">
          <Link href="/terms">서비스 이용약관</Link>
        </li>
        <Dot className="bg-transparent" />
        <li className="text-sm text-neutral-700">
          <Link href="/privacy">개인정보처리방침</Link>
        </li>
      </ul>
      <p className="my-2 text-sm text-neutral-700">
        당근빳다. patda. All rights reserved.
      </p>
    </div>
  );
}
