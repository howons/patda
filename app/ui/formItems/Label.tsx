import { Label as HeadlessLabel } from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { LabelHTMLAttributes, PropsWithChildren } from "react";

import { cn } from "#utils/utils.js";

const labelVariants = cva("font-bold", {
  variants: {
    colorStyle: {
      orange: "text-orange-500",
      red: "text-red-500",
      green: "text-green-500",
      zinc: "text-zinc-500",
      lime: "text-lime-500",
      rose: "text-rose-500",
    },
    size: {
      xl: "text-xl",
      lg: "text-lg",
      md: "text-md",
      sm: "text-sm",
    },
  },
  defaultVariants: {
    colorStyle: "orange",
    size: "lg",
  },
});

interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

export default function Label({
  colorStyle,
  size,
  className,
  children,
  ...props
}: PropsWithChildren<LabelProps>) {
  return (
    <HeadlessLabel
      className={cn(labelVariants({ colorStyle, size, className }))}
      {...props}>
      {children}
    </HeadlessLabel>
  );
}
