"use client";

import {
  type ComponentProps,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { useFormStatus } from "react-dom";

import type { ActionState } from "#lib/types/action.js";

interface MutationButtonGroupProps {
  updateClicked: boolean;
  setUpdateClicked: Dispatch<SetStateAction<boolean>>;
  deleteAction: (payload: FormData) => void;
  deleteState: ActionState;
}

export default function MutationButtonGroup({
  updateClicked,
  setUpdateClicked,
  deleteAction,
  deleteState,
}: MutationButtonGroupProps) {
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  useEffect(() => {
    if (!deleteState || deleteState.status === "SUCCESS") return;

    if (
      deleteState.status === "ERROR_AUTH" ||
      deleteState.status === "ERROR_DATABASE" ||
      deleteState.status === "ERROR_INTERNAL"
    ) {
      setDeleteErrorMessage(deleteState.message);
    }

    setTimeout(() => setDeleteErrorMessage(""), 3000);
  }, [deleteState]);

  if (updateClicked) {
    return (
      <MutationButton theme="concern" onClick={() => setUpdateClicked(false)}>
        취소
      </MutationButton>
    );
  }

  if (deleteClicked) {
    return deleteErrorMessage === "" ? (
      <form action={deleteAction}>
        <MutationSubmitButton theme="alert">삭제 승인</MutationSubmitButton>
        <MutationButton theme="concern" onClick={() => setDeleteClicked(false)}>
          취소
        </MutationButton>
      </form>
    ) : (
      <MutationButton onClick={() => setDeleteErrorMessage("")}>
        {deleteErrorMessage}
      </MutationButton>
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
