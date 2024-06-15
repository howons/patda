"use client";

import { Button } from "@headlessui/react";
import { IoChevronBack } from "@react-icons/all-files/io5/IoChevronBack";
import { useRouter } from "next/navigation";

function CancelButton() {
  const router = useRouter();

  return (
    <Button
      className="flex h-12 min-w-20 items-center justify-center rounded-lg text-center text-lg text-neutral-400 hover:text-neutral-500"
      onClick={() => router.back()}>
      <IoChevronBack className="size-6" />
      취소
    </Button>
  );
}

export default CancelButton;
