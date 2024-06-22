"use client";

import { Button as HeadlessButton } from "@headlessui/react";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { usePlatformStore } from "#lib/providers/PlatformStoreProvider";
import { Platform } from "#lib/types/property";
import Logo from "#public/당근빳다.svg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "primary" | "sub";
  loading?: boolean;
}

function Button({
  theme = "sub",
  loading,
  className = "",
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const platform = usePlatformStore((store) => store.platform);

  const defaultStyle =
    "relative rounded-lg h-12 min-w-28 text-lg text-center font-bold overflow-hidden";

  const isPrimary = theme === "primary";
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

  const logoDefaultStyle =
    "absolute -bottom-2 -left-4 size-8 origin-[25%_75%] -rotate-45 opacity-70";
  const logoPlatformStyles: { [key in Platform]: string } = {
    daangn: isPrimary ? "fill-orange-100" : "fill-orange-400",
    bunjang: isPrimary ? "fill-red-100" : "fill-red-400",
    joongna: isPrimary ? "fill-green-100" : "fill-green-400",
    etc: isPrimary ? "fill-zinc-100" : "fill-zinc-400",
  };

  return (
    <HeadlessButton
      disabled={loading}
      className={`${defaultStyle} ${platformStyles[platform]} ${className}`}
      {...props}>
      <Logo
        className={`${logoDefaultStyle} ${logoPlatformStyles[platform]} ${loading ? "animate-swing-vert" : ""}`}
      />
      {children}
    </HeadlessButton>
  );
}

export default Button;
