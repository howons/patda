import { Select as HeadlessSelect } from "@headlessui/react";
import React, { SelectHTMLAttributes } from "react";

import type { FormColor } from "#lib/types/property.js";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; name: string }[];
  color: FormColor;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, color, className = "", ...props }, ref) => {
    const colorStyles: { [key in FormColor]: string } = {
      orange: "border-orange-500 focus:outline-orange-400",
      red: "border-red-500 focus:outline-red-400",
      green: "border-green-500 focus:outline-green-400",
      zinc: "border-zinc-500 focus:outline-zinc-400",
      rose: "border-rose-500 focus:outline-rose-400",
      lime: "border-lime-500 focus:outline-lime-400",
    };

    const defaultStyle = "h-8 min-w-32 rounded border px-2";

    return (
      <HeadlessSelect
        ref={ref}
        className={`${defaultStyle} ${colorStyles[color]} ${className}`}
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
