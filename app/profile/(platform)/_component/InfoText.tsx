import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";

import type { FormColor } from "#lib/types/property.js";
import { cn } from "#utils/utils.js";

const textVariants = cva("min-h-6 min-w-16 border-b-2 px-3 py-2", {
  variants: {
    colorStyle: {
      orange: "border-orange-300",
      red: "border-red-300",
      green: "border-green-300",
      zinc: "border-zinc-300",
      lime: "border-lime-300",
      rose: "border-rose-300",
    },
  },
  defaultVariants: {
    colorStyle: "orange",
  },
});

interface InfoTextProps extends ComponentProps<"input"> {
  text: string;
  colorStyle: FormColor;
  isEdit?: boolean;
}

export default function InfoText({
  text,
  colorStyle,
  isEdit,
  className,
  ...props
}: InfoTextProps) {
  if (isEdit) {
    return <input></input>;
  }

  return (
    <p
      className={cn(
        textVariants({ colorStyle, className }),
        text.length <= 0 && "border-zinc-200"
      )}>
      {text}
    </p>
  );
}
