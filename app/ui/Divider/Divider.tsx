import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

import { cn } from "#utils/utils.js";

const dividerVariants = cva("border-zinc-200", {
  variants: {
    direction: {
      horizon: "mx-auto w-11/12 border-t",
      vertical: "h-11/12 my-auto border-l",
    },
  },
  defaultVariants: {
    direction: "horizon",
  },
});

interface DividerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {}

function Divider({ direction, className, ...props }: DividerProps) {
  return (
    <div className={cn(dividerVariants({ direction, className }))} {...props} />
  );
}

export default Divider;
