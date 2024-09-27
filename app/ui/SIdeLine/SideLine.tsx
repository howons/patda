import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import Dot from "#ui/Dot/Dot.jsx";
import { cn } from "#utils/utils.js";

const sideLineVariants = cva("grow border-l transition-colors", {
  variants: {
    colorStyle: {
      orange: "border-orange-300",
      red: "border-red-300",
      green: "border-green-300",
      zinc: "border-zinc-300",
      rose: "border-rose-300",
      lime: "border-lime-300",
    },
  },
});

export interface SideLineProps
  extends ComponentProps<"div">,
    VariantProps<typeof sideLineVariants> {
  topDotSize?: "sm" | "md";
  bottomDotSize?: "sm" | "md";
}

export default function SideLine({
  colorStyle,
  topDotSize,
  bottomDotSize,
  className = "",
  ...props
}: SideLineProps) {
  return (
    <div
      className={`flex shrink-0 grow-0 basis-5 flex-col items-center justify-center xs:ml-2.5 ${className}`}
      {...props}>
      {topDotSize && (
        <Dot
          colorStyle={colorStyle}
          size={topDotSize}
          className="transition-colors"
        />
      )}
      <div className={cn(sideLineVariants({ colorStyle }))} />
      {bottomDotSize && (
        <Dot
          colorStyle={colorStyle}
          size={bottomDotSize}
          className="transition-colors"
        />
      )}
    </div>
  );
}
