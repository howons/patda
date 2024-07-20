"use client";

import { Fieldset } from "@headlessui/react";
import { useRouter } from "next/navigation";
import type { Session } from "next-auth";
import { useCallback } from "react";

import {
  type CommentFormValues,
  createCommentAction,
} from "#lib/actions/createCommentAction.js";
import { useFormAction } from "#lib/hooks/useFormAction.js";
import {
  ErrorText,
  Label,
  Legend,
  SubmitButton,
  Textarea,
} from "#ui/formItems/index.jsx";

interface CommentFormProps {
  session: Session;
}

export default function CommentForm({ session }: CommentFormProps) {
  const router = useRouter();

  const onSuccess = useCallback(() => {
    router.refresh();
  }, [router]);
  const {
    register,
    formState: { errors },
    formAction,
  } = useFormAction<CommentFormValues>({
    action: createCommentAction,
    onSuccess,
  });

  return (
    <form action={formAction}>
      <Fieldset>
        <Legend>댓글 • 반박 작성</Legend>
      </Fieldset>
    </form>
  );
}
