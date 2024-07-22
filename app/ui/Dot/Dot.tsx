import type { ComponentProps } from "react";

interface DotProps extends ComponentProps<"div"> {
  color: "orange" | "red" | "green" | "zinc" | "lime" | "rose";
  size?: "sm" | "md";
}

export default function Dot({
  color,
  size = "sm",
  className = "",
  ...props
}: DotProps) {
  const defaultStyle = "origin-center rotate-45 border bg-white shrink-0";

  const colorStyle = {
    orange: "border-orange-300",
    red: "border-red-300",
    green: "border-green-300",
    zinc: "border-zinc-300",
    lime: "border-lime-300",
    rose: "border-rose-300",
  };

  const sizeStyle = {
    sm: "size-2",
    md: "size-4",
  };

  return (
    <div
      className={`${defaultStyle} ${colorStyle[color]} ${sizeStyle[size]} ${className}`}
      {...props}
    />
  );
}
