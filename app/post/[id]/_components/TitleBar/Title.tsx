import type { ComponentProps } from "react";

import { cn } from "#utils/utils.js";

interface TitleProps extends ComponentProps<"h1"> {}

export default function Title({ className, children, ...props }: TitleProps) {
  return (
    <h1 className={cn("text-xl font-bold", className)} {...props}>
      {children}
    </h1>
  );
}
