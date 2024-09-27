import { Legend as HeadlessLegend } from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, PropsWithChildren } from "react";

import { cn } from "#utils/utils.js";

const legendVariants = cva("text-2xl font-bold", {
  variants: {
    colorStyle: {
      orange: "text-orange-600",
      red: "text-red-600",
      green: "text-green-600",
      zinc: "text-zinc-600",
      lime: "text-lime-600",
      rose: "text-rose-600",
    },
  },
  defaultVariants: {
    colorStyle: "orange",
  },
});

interface LegendProps
  extends ComponentProps<"legend">,
    VariantProps<typeof legendVariants> {}

function Legend({
  colorStyle,
  className,
  children,
  ...props
}: PropsWithChildren<LegendProps>) {
  return (
    <HeadlessLegend
      className={cn(legendVariants({ colorStyle, className }))}
      {...props}>
      {children}
    </HeadlessLegend>
  );
}

export default Legend;
