import type { ComponentProps } from "react";

import Dot from "#ui/Dot/Dot.jsx";

export interface SideLineProps extends ComponentProps<"div"> {
  color: "rose" | "lime";
  topDotSize?: "sm" | "md";
  bottomDotSize?: "sm" | "md";
}

export default function SideLine({
  color,
  topDotSize,
  bottomDotSize,
  className = "",
  ...props
}: SideLineProps) {
  const lineColorStyles = {
    lime: "border-lime-300",
    rose: "border-rose-300",
  };

  return (
    <div
      className={`flex shrink-0 grow-0 basis-5 flex-col items-center justify-center xs:ml-2.5 ${className}`}
      {...props}>
      {topDotSize && (
        <Dot color={color} size={topDotSize} className="transition-colors" />
      )}
      <div
        className={`grow border-l transition-colors ${lineColorStyles[color]}`}
      />
      {bottomDotSize && (
        <Dot color={color} size={bottomDotSize} className="transition-colors" />
      )}
    </div>
  );
}
