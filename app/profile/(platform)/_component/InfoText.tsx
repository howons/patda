import type { ComponentProps, PropsWithChildren } from "react";

import { cn } from "#utils/utils.js";

interface InfoTextProps extends ComponentProps<"p"> {}

export default function InfoText({
  children,
  className,
  ...props
}: PropsWithChildren<InfoTextProps>) {
  return (
    <p
      className={cn("px-3 py-2 border-b-2 min-h-6 min-w-16", className)}
      {...props}>
      {children}
    </p>
  );
}
