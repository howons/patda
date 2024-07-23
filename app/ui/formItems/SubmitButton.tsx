"use client";

import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

import type { FormColor } from "#lib/types/property.js";
import Button from "#ui/Button/Button.jsx";

interface SubmitButtonProps {
  color: FormColor;
  classname?: string;
}

function SubmitButton({
  color,
  classname = "",
  children,
}: PropsWithChildren<SubmitButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <Button
      color={color}
      loading={pending}
      type="submit"
      theme="primary"
      className={classname}>
      {children}
    </Button>
  );
}

export default SubmitButton;
