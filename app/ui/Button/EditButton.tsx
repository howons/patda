"use client";

import { FiCheck } from "@react-icons/all-files/fi/FiCheck";
import { FiEdit3 } from "@react-icons/all-files/fi/FiEdit3";
import { type ComponentPropsWithRef, useDeferredValue } from "react";

import Button from "#ui/Button/Button.jsx";
import { cn } from "#utils/utils.js";

interface EditButtonProp extends ComponentPropsWithRef<"button"> {
  isEdit: boolean;
}

export default function EditButton({
  isEdit,
  className,
  ...props
}: EditButtonProp) {
  const deferredIsEdit = useDeferredValue(isEdit);

  return (
    <Button
      type={deferredIsEdit ? "submit" : "button"}
      title={isEdit ? "confirmEdit" : "edit"}
      className={cn(
        "rounded-full size-10 transition-all duration-300 min-w-0",
        isEdit && "size-14",
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
    </Button>
  );
}
