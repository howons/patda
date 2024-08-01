import { Textarea as HeadlessTextarea } from "@headlessui/react";
import React, { type ComponentPropsWithRef } from "react";

import type { FormColor } from "#lib/types/property.js";

interface TextareaProps extends ComponentPropsWithRef<"textarea"> {
  color: FormColor;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ color, className = "", ...props }, ref) => {
    const colorStyles: { [key in FormColor]: string } = {
      orange: "border-orange-500 focus:outline-orange-400",
      red: "border-red-500 focus:outline-red-400",
      green: "border-green-500 focus:outline-green-400",
      zinc: "border-zinc-500 focus:outline-zinc-400",
      lime: "border-lime-500 focus:outline-lime-400",
      rose: "border-rose-500 focus:outline-rose-400",
    };

    const defaultStyle =
      "min-h-40 min-w-40 rounded border px-2 py-1 transition-colors";

    return (
      <HeadlessTextarea
        ref={ref}
        className={`${defaultStyle} ${colorStyles[color]} ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
