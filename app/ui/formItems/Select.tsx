import { Select as HeadlessSelect } from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import React, { SelectHTMLAttributes } from "react";

import { cn } from "#utils/utils.js";

const selectVariants = cva("h-8 min-w-32 rounded border px-2", {
  variants: {
    colorStyle: {
      orange: "border-orange-500 focus:outline-orange-400",
      red: "border-red-500 focus:outline-red-400",
      green: "border-green-500 focus:outline-green-400",
      zinc: "border-zinc-500 focus:outline-zinc-400",
      rose: "border-rose-500 focus:outline-rose-400",
      lime: "border-lime-500 focus:outline-lime-400",
    },
  },
  defaultVariants: {
    colorStyle: "orange",
  },
});

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  options: { value: string; name: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, colorStyle, className, ...props }, ref) => {
    return (
      <HeadlessSelect
        ref={ref}
        className={cn(selectVariants({ colorStyle, className }))}
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
