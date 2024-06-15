"use client";
import Button from "@ui/Button/Button";
import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton({ children }: PropsWithChildren<{}>) {
  const { pending } = useFormStatus();

  return (
    <Button loading={pending} type="submit" theme="primary">
      {children}
    </Button>
  );
}

export default SubmitButton;
