import type { ComponentProps } from "react";

interface ElementToastContainerProps extends ComponentProps<"div"> {}

export default function ElementToastContainer({
  children,
  ...props
}: ElementToastContainerProps) {
  return (
    <div className="relative" {...props}>
      {children}
    </div>
  );
}
