import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import { FaChevronUp } from "@react-icons/all-files/fa/FaChevronUp";
import type { ComponentProps } from "react";

interface MoreButtonProps extends ComponentProps<"button"> {
  isActive: boolean;
}

export default function MoreButton({
  isActive,
  className = "",
  ...props
}: MoreButtonProps) {
  return (
    <button
      className={`sticky bottom-0 left-0 flex h-12 w-full items-center justify-center ${!isActive ? "bg-gradient-to-t from-white to-white/0" : ""} ${className}`}
      {...props}>
      {isActive ? (
        <FaChevronUp className="size-4 fill-neutral-700" />
      ) : (
        <FaChevronDown className="size-4 fill-neutral-700" />
      )}
    </button>
  );
}
