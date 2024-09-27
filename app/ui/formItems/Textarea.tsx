import { Textarea as HeadlessTextarea } from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import React, { type ComponentPropsWithRef } from "react";

import { cn } from "#utils/utils.js";

const textareaVariants = cva(
  "min-h-40 min-w-20 rounded border px-2 py-1 transition-colors",
  {
    variants: {
      colorStyle: {
        orange: "border-orange-500 focus:outline-orange-400",
        red: "border-red-500 focus:outline-red-400",
        green: "border-green-500 focus:outline-green-400",
        zinc: "border-zinc-500 focus:outline-zinc-400",
        lime: "border-lime-500 focus:outline-lime-400",
        rose: "border-rose-500 focus:outline-rose-400",
      },
    },
    defaultVariants: {
      colorStyle: "orange",
    },
  }
);

interface TextareaProps
  extends ComponentPropsWithRef<"textarea">,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ colorStyle, className, ...props }, ref) => {
    return (
      <HeadlessTextarea
        ref={ref}
        className={cn(textareaVariants({ colorStyle, className }))}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
