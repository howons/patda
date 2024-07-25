"use client";

import {
  type ComponentProps,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useState,
} from "react";
import { useFormStatus } from "react-dom";

interface MutationButtonGroupProps {
  updateClicked: boolean;
  setUpdateClicked: Dispatch<SetStateAction<boolean>>;
  deleteAction: (payload: FormData) => void;
}

export default function MutationButtonGroup({
  updateClicked,
  setUpdateClicked,
  deleteAction,
}: MutationButtonGroupProps) {
  const [deleteClicked, setDeleteClicked] = useState(false);

  if (updateClicked) {
    return (
      <MutationButton theme="concern" onClick={() => setUpdateClicked(false)}>
        취소
      </MutationButton>
    );
  }

  if (deleteClicked) {
    return (
      <form action={deleteAction}>
        <MutationSubmitButton theme="alert">삭제 승인</MutationSubmitButton>
        <MutationButton theme="concern" onClick={() => setDeleteClicked(false)}>
          취소
        </MutationButton>
      </form>
    );
  }

  return (
    <>
      <MutationButton onClick={() => setUpdateClicked(true)}>
        수정
      </MutationButton>
      <MutationButton onClick={() => setDeleteClicked(true)}>
        삭제
      </MutationButton>
    </>
  );
}

interface MutationButtonProps extends ComponentProps<"button"> {
  theme?: "normal" | "alert" | "concern" | "disabled";
}

function MutationButton({
  theme = "normal",
  children,
  className = "",
  ...props
}: PropsWithChildren<MutationButtonProps>) {
  const themeStyles = {
    normal: "text-neutral-400 hover:text-neutral-600",
    concern: "text-indigo-400 hover:text-indigo-600",
    alert: "text-pink-400 hover:text-pink-600",
    disabled: "text-gray-400",
  };

  return (
    <button
      className={`px-1.5 text-sm ${themeStyles[theme]} ${className}`}
      {...props}>
      {children}
    </button>
  );
}

function MutationSubmitButton({
  theme = "normal",
  children,
  className = "",
  ...props
}: MutationButtonProps) {
  const { pending } = useFormStatus();

  return (
    <MutationButton
      type="submit"
      theme={pending ? "disabled" : theme}
      className={className}
      disabled={pending}
      {...props}>
      {children}
    </MutationButton>
  );
}
