import { Input as HeadlessInput } from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "#utils/utils.js";

const inputVariants = cva("h-8 min-w-32 rounded border px-2", {
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

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ colorStyle, className, ...props }, ref) => {
    return (
      <HeadlessInput
        ref={ref}
        className={cn(inputVariants({ colorStyle, className }))}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
