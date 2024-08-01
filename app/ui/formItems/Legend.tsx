import { Legend as HeadlessLegend } from "@headlessui/react";
import type { ComponentProps, PropsWithChildren } from "react";

import type { FormColor } from "#lib/types/property.js";

interface LegendProps extends ComponentProps<"legend"> {
  color: FormColor;
}

function Legend({
  color,
  className = "",
  children,
  ...props
}: PropsWithChildren<LegendProps>) {
  const colorStyles: { [key in FormColor]: string } = {
    orange: "text-orange-600",
    red: "text-red-600",
    green: "text-green-600",
    zinc: "text-zinc-600",
    lime: "text-lime-600",
    rose: "text-rose-600",
  };

  const defaultStyle = "font-bold text-2xl";

  return (
    <HeadlessLegend
      className={`${defaultStyle} ${colorStyles[color]} ${className}`}
      {...props}>
      {children}
    </HeadlessLegend>
  );
}

export default Legend;
