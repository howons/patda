"use client";

import { Button } from "@headlessui/react";
import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { Platform } from "@lib/types/property";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "primary" | "sub";
}

function FormButton({
  theme = "sub",
  className = "",
  children,
  ...props
}: PropsWithChildren<FormButtonProps>) {
  const isPrimary = theme === "primary";

  const platform = usePlatformStore((store) => store.platform);

  const platformStyles: { [key in Platform]: string } = {
    daangn: isPrimary
      ? "bg-orange-400 data-[hover]:bg-orange-300 text-white"
      : "bg-orange-50 data-[hover]:bg-orange-100 border border-orange-400 text-orange-400",
    bunjang: isPrimary
      ? "bg-red-400 data-[hover]:bg-red-300 text-white"
      : "bg-red-50 data-[hover]:bg-red-100 border border-red-400 text-red-400",
    joongna: isPrimary
      ? "bg-green-400 data-[hover]:bg-green-300 text-white"
      : "bg-green-50 data-[hover]:bg-green-100 border border-green-400 text-green-400",
    etc: isPrimary
      ? "bg-zinc-400 data-[hover]:bg-zinc-300 text-white"
      : "bg-zinc-50 data-[hover]:bg-zinc-100 border border-zinc-400 text-zinc-400",
  };

  const defaultStyle =
    "relative rounded-lg h-12 min-w-28 text-lg text-center font-bold";

  return (
    <Button
      className={`${defaultStyle} ${platformStyles[platform]} ${className}`}
      {...props}>
      {children}
    </Button>
  );
}

export default FormButton;
