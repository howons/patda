import { Input as HeadlessInput } from "@headlessui/react";
import React from "react";

import type { FormColor } from "#lib/types/property.js";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  color: FormColor;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ color, className = "", ...props }, ref) => {
    const colorStyles: { [key in FormColor]: string } = {
      orange: "border-orange-500 focus:outline-orange-400",
      red: "border-red-500 focus:outline-red-400",
      green: "border-green-500 focus:outline-green-400",
      zinc: "border-zinc-500 focus:outline-zinc-400",
      rose: "border-rose-500 focus:outline-rose-400",
      lime: "border-lime-500 focus:outline-lime-400",
    };

    const inputDefaultStyle = "h-8 min-w-32 rounded border px-2";

    return (
      <HeadlessInput
        ref={ref}
        className={`${inputDefaultStyle} ${colorStyles[color]} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
