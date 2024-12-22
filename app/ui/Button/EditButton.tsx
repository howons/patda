import { FiCheck } from "@react-icons/all-files/fi/FiCheck";
import { FiEdit3 } from "@react-icons/all-files/fi/FiEdit3";
import type { ComponentProps } from "react";

import { cn } from "#utils/utils.js";

interface EditButtonProp extends ComponentProps<"button"> {
  isEdit: boolean;
}

export default function EditButton({
  isEdit,
  className,
  ...props
}: EditButtonProp) {
  return (
    <button
      type={isEdit ? "submit" : "button"}
      className={cn(
        "rounded-full bg-neutral-300/30 hover:bg-neutral-300/70 size-10 relative transition-all duration-300",
        isEdit && "size-14 bg-green-300/30 hover:bg-green-300/70",
        className
      )}
      {...props}>
      <FiCheck
        className={cn(
          "transition duration-300 absolute top-[20%] left-[20%] size-[60%] opacity-0 -rotate-45 stroke-green-700",
          isEdit && "rotate-0 opacity-100"
        )}
      />
      <FiEdit3
        className={cn(
          "transition duration-300 absolute top-[20%] left-[20%] size-[60%] stroke-neutral-700",
          isEdit && "-rotate-45 opacity-0"
        )}
      />
    </button>
  );
}
