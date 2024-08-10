"use client";

import { Select as HeadlessSelect } from "@headlessui/react";
import React, { SelectHTMLAttributes } from "react";

import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import type { Platform } from "#lib/types/property.js";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; name: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, className = "", ...props }, ref) => {
    const platform = usePlatformStore((store) => store.platform);

    const platformStyles: { [key in Platform]: string } = {
      daangn: "border-orange-500 focus:outline-orange-400",
      bunjang: "border-red-500 focus:outline-red-400",
      joongna: "border-green-500 focus:outline-green-400",
      etc: "border-zinc-500 focus:outline-zinc-400",
    };

    const defaultStyle = "h-8 min-w-32 rounded border px-2";

    return (
      <HeadlessSelect
        ref={ref}
        value={platform}
        className={`${defaultStyle} ${platformStyles[platform]} ${className}`}
        {...props}>
        {options.map(({ value, name }) => (
          <option key={name} value={value}>
            {name}
          </option>
        ))}
      </HeadlessSelect>
    );
  }
);

Select.displayName = "Select";

export default Select;
