import type { ComponentProps } from "react";

interface TitleProps extends ComponentProps<"h1"> {}

export default function Title({
  className = "",
  children,
  ...props
}: TitleProps) {
  return (
    <h1 className={`text-xl font-bold ${className}`} {...props}>
      {children}
    </h1>
  );
}
