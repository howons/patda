import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "#utils/utils.js";

const dotVariants = cva("shrink-0 origin-center rotate-45 border bg-white", {
  variants: {
    colorStyle: {
      orange: "border-orange-300",
      red: "border-red-300",
      green: "border-green-300",
      zinc: "border-zinc-300",
      lime: "border-lime-300",
      rose: "border-rose-300",
    },
    size: {
      sm: "size-2",
      md: "size-4",
    },
  },
  defaultVariants: {
    colorStyle: "orange",
    size: "sm",
  },
});

interface DotProps
  extends ComponentProps<"div">,
    VariantProps<typeof dotVariants> {}

export default function Dot({
  colorStyle,
  size,
  className,
  ...props
}: DotProps) {
  return (
    <div
      className={cn(dotVariants({ colorStyle, size, className }))}
      {...props}
    />
  );
}
