import type { ComponentProps } from "react";

import type { Platform } from "#lib/types/property.js";

interface DotProps extends ComponentProps<"div"> {
  platform: Platform;
  size?: "sm" | "md";
}

export default function Dot({
  platform,
  size = "sm",
  className,
  ...props
}: DotProps) {
  const defaultStyle = "origin-center rotate-45 border bg-white shrink-0";

  const platformStyle: { [key in Platform]: string } = {
    daangn: "border-orange-300",
    bunjang: "border-red-300",
    joongna: "border-green-300",
    etc: "border-zinc-300",
  };

  const sizeStyle = {
    sm: "size-2",
    md: "size-4",
  };

  return (
    <div
      className={`${defaultStyle} ${platformStyle[platform]} ${sizeStyle[size]} ${className}`}
      {...props}
    />
  );
}
