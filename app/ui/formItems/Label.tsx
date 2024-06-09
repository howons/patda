"use client";

import { Label as HeadlessLabel } from "@headlessui/react";
import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { Platform } from "@lib/types/property";
import { LabelHTMLAttributes, PropsWithChildren } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  size?: "xl" | "lg" | "md" | "sm";
}

function Label({
  size = "lg",
  className = "",
  children,
  ...props
}: PropsWithChildren<LabelProps>) {
  const platform = usePlatformStore((store) => store.platform);

  const sizeStyles: {
    [key in Exclude<LabelProps["size"], undefined>]: string;
  } = {
    xl: "text-xl",
    lg: "text-lg",
    md: "text-md",
    sm: "text-sm",
  };

  const platformStyles: { [key in Platform]: string } = {
    daangn: "text-orange-600",
    bunjang: "text-red-600",
    joongna: "text-green-600",
    etc: "text-zinc-600",
  };

  const defaultStyle = "font-bold";

  return (
    <HeadlessLabel
      className={`${defaultStyle} ${sizeStyles[size]} ${platformStyles[platform]} ${className}`}
      {...props}>
      {children}
    </HeadlessLabel>
  );
}

export default Label;
