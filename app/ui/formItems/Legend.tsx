"use client";

import { Legend as HeadlessLegend } from "@headlessui/react";
import { HTMLAttributes, PropsWithChildren } from "react";

import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import type { Platform } from "#lib/types/property.js";

interface LegendProps extends HTMLAttributes<HTMLLegendElement> {}

function Legend({
  className = "",
  children,
  ...props
}: PropsWithChildren<LegendProps>) {
  const platform = usePlatformStore((store) => store.platform);

  const platformStyles: { [key in Platform]: string } = {
    daangn: "text-orange-600",
    bunjang: "text-red-600",
    joongna: "text-green-600",
    etc: "text-zinc-600",
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
