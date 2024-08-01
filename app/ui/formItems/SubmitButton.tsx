"use client";

import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

import type { FormColor } from "#lib/types/property.js";
import Button from "#ui/Button/Button.jsx";

interface SubmitButtonProps {
  color: FormColor;
  className?: string;
}

function SubmitButton({
  color,
  className = "",
  children,
}: PropsWithChildren<SubmitButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <Button
      color={color}
      loading={pending}
      type="submit"
      theme="primary"
      className={className}>
      {children}
    </Button>
  );
}

export default SubmitButton;
