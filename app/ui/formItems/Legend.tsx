"use client";

import { Legend as HeadlessLegend } from "@headlessui/react";
import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { Platform } from "@lib/types/property";
import { HTMLAttributes, PropsWithChildren } from "react";

interface LegendProps extends HTMLAttributes<HTMLLegendElement> {}

function Legend({
  className = "",
  children,
  ...props
}: PropsWithChildren<LegendProps>) {
  const platform = usePlatformStore((store) => store.platform);

  const platformStyles: { [key in Platform]: string } = {
    daangn: "text-orange-700",
    bunjang: "text-red-700",
    joongna: "text-green-700",
    etc: "text-zinc-700",
  };

  const defaultStyle = "font-bold text-2xl";

  return (
    <HeadlessLegend
      className={`${defaultStyle} ${platformStyles[platform]} ${className}`}
      {...props}>
      {children}
    </HeadlessLegend>
  );
}

export default Legend;
