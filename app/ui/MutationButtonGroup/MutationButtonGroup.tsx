"use client";

import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import {
  type ComponentProps,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { useFormStatus } from "react-dom";

import type { ActionState } from "#lib/types/action.js";
import { cn } from "#utils/utils.js";

interface CommonProps {
  deleteState: ActionState;
}
type ConditionalUpdateProps =
  | {
      updateClicked: boolean;
      onUpdateClick: (value: boolean) => void;
      updateHref?: never;
    }
  | {
      updateClicked?: never;
      onUpdateClick?: never;
      updateHref: string;
    };

type MutationButtonGroupProps = CommonProps & ConditionalUpdateProps;

export default function MutationButtonGroup(props: MutationButtonGroupProps) {
  const { deleteState } = props;

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

  if (props.updateClicked) {
    return (
      <div className="flex justify-end">
        <MutationButton
          theme="concern"
          onClick={() => props.onUpdateClick(false)}>
          취소
        </MutationButton>
      </div>
    );
  }

  if (deleteClicked) {
    return (
      <div className="flex justify-end">
        {deleteErrorMessage === "" ? (
          <>
            <MutationSubmitButton theme="alert">삭제 승인</MutationSubmitButton>
            <MutationButton
              theme="concern"
              onClick={() => setDeleteClicked(false)}>
              취소
            </MutationButton>
          </>
        ) : (
          <MutationButton onClick={() => setDeleteErrorMessage("")}>
            {deleteErrorMessage}
          </MutationButton>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-end">
      {props.onUpdateClick ? (
        <MutationButton onClick={() => props.onUpdateClick(true)}>
          수정
        </MutationButton>
      ) : (
        <Link href={props.updateHref ?? ""}>
          <MutationButton>수정</MutationButton>
        </Link>
      )}
      <MutationButton onClick={() => setDeleteClicked(true)}>
        삭제
      </MutationButton>
    </div>
  );
}

const mutationButtonVariants = cva("px-1.5 text-sm", {
  variants: {
    theme: {
      normal: "text-neutral-400 hover:text-neutral-600",
      concern: "text-indigo-400 hover:text-indigo-600",
      alert: "text-pink-400 hover:text-pink-600",
      disabled: "text-gray-400",
    },
  },
  defaultVariants: {
    theme: "normal",
  },
});

interface MutationButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof mutationButtonVariants> {}

function MutationButton({
  theme,
  children,
  className,
  ...props
}: PropsWithChildren<MutationButtonProps>) {
  return (
    <button
      type="button"
      className={cn(mutationButtonVariants({ theme, className }))}
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
