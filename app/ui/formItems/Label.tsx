import { Label as HeadlessLabel } from "@headlessui/react";
import { LabelHTMLAttributes, PropsWithChildren } from "react";

import type { FormColor } from "#lib/types/property.js";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  color: FormColor;
  size?: "xl" | "lg" | "md" | "sm";
}

function Label({
  color,
  size = "lg",
  className = "",
  children,
  ...props
}: PropsWithChildren<LabelProps>) {
  const sizeStyles: {
    [key in Exclude<LabelProps["size"], undefined>]: string;
  } = {
    xl: "text-xl",
    lg: "text-lg",
    md: "text-md",
    sm: "text-sm",
  };

  const colorStyles: { [key in FormColor]: string } = {
    orange: "text-orange-500",
    red: "text-red-500",
    green: "text-green-500",
    zinc: "text-zinc-500",
    lime: "text-lime-500",
    rose: "text-rose-500",
  };

  const defaultStyle = "font-bold";

  return (
    <HeadlessLabel
      className={`${defaultStyle} ${sizeStyles[size]} ${colorStyles[color]} ${className}`}
      {...props}>
      {children}
    </HeadlessLabel>
  );
}

export default Label;
