"use client";

import { Input as HeadlessInput } from "@headlessui/react";
import React from "react";

import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import type { Platform } from "#lib/types/property.js";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    const platform = usePlatformStore((store) => store.platform);

    const platformStyles: { [key in Platform]: string } = {
      daangn: "border-orange-500 focus:outline-orange-400",
      bunjang: "border-red-500 focus:outline-red-400",
      joongna: "border-green-500 focus:outline-green-400",
      etc: "border-zinc-500 focus:outline-zinc-400",
    };

    const inputDefaultStyle = "h-8 min-w-40 rounded border px-2";

    return (
      <HeadlessInput
        ref={ref}
        className={`${inputDefaultStyle} ${platformStyles[platform]} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
