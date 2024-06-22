"use client";

import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

import Button from "#ui/Button/Button";

function SubmitButton({ children }: PropsWithChildren<{}>) {
  const { pending } = useFormStatus();

  return (
    <Button loading={pending} type="submit" theme="primary">
      {children}
    </Button>
  );
}

export default SubmitButton;
