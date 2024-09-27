"use client";

import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

import type { FormColor } from "#lib/types/property.js";
import Button from "#ui/Button/Button.jsx";

interface SubmitButtonProps {
  colorStyle: FormColor;
  className?: string;
}

export default function SubmitButton({
  colorStyle,
  className = "",
  children,
}: PropsWithChildren<SubmitButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <Button
      colorStyle={colorStyle}
      loading={pending}
      type="submit"
      intent="primary"
      className={className}>
      {children}
    </Button>
  );
}
