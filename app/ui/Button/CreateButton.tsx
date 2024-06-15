"use client";

import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { Platform } from "@lib/types/property";
import { BiPlus } from "@react-icons/all-files/bi/BiPlus";
import Link from "next/link";

interface CreateButtonProps {
  classname?: string;
}

function CreateButton({ classname = "" }: CreateButtonProps) {
  const platform = usePlatformStore((store) => store.platform);

  const defaultStyle =
    "flex size-10 items-center justify-center rotate-45 transition-all hover:rounded-3xl hover:scale-[1.41]";

  const platformStyle: { [key in Platform]: string } = {
    daangn: "bg-orange-400",
    bunjang: "bg-red-400",
    joongna: "bg-green-400",
    etc: "bg-zinc-400",
  };

  return (
    <Link
      href="/post/create"
      className={`${defaultStyle} ${platformStyle[platform]} ${classname}`}>
      <BiPlus className="size-8 rotate-45 fill-white" />
    </Link>
  );
}

export default CreateButton;
