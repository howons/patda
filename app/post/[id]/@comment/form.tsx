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
import Dot from "#ui/Dot/Dot.jsx";
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
    watch,
  } = useFormAction<CommentFormValues>({
    action: createCommentAction,
    onSuccess,
  });

  const status = watch("status");
  const isDebate = status === "debate";
  const color = isDebate ? "rose" : "lime";

  return (
    <form action={formAction}>
      <Fieldset>
        <Legend color={color} className="ml-10 text-xl">
          <b
            className={`transition-all duration-300 ${isDebate ? "text-sm font-normal text-rose-300" : ""}`}>
            댓글
          </b>
          <Dot className="mx-2 inline-block border-lime-300" />
          <b
            className={`transition-all duration-300 ${isDebate ? "" : "text-sm font-normal text-lime-300"}`}>
            반박
          </b>{" "}
          작성
        </Legend>
      </Fieldset>
    </form>
  );
}
