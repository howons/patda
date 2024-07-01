"use client";

import { Textarea as HeadlessTextarea } from "@headlessui/react";
import React from "react";

import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import type { Platform } from "#lib/types/property.js";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => {
    const platform = usePlatformStore((store) => store.platform);

    const platformStyles: { [key in Platform]: string } = {
      daangn: "border-orange-500 focus:outline-orange-400",
      bunjang: "border-red-500 focus:outline-red-400",
      joongna: "border-green-500 focus:outline-green-400",
      etc: "border-zinc-500 focus:outline-zinc-400",
    };

    const defaultStyle = "h-40 min-w-40 rounded border px-2";

    return (
      <HeadlessTextarea
        ref={ref}
        className={`${defaultStyle} ${platformStyles[platform]} ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
