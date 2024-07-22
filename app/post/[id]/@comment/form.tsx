"use client";

import { Fieldset } from "@headlessui/react";
import { useRouter } from "next/navigation";
import type { Session } from "next-auth";
import { useCallback, useState } from "react";

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
import Switch from "#ui/formItems/Switch.jsx";

interface CommentFormProps {
  session: Session;
}

export default function CommentForm({ session }: CommentFormProps) {
  const [isDebate, setIsDebate] = useState(false);
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

  const color = isDebate ? "rose" : "lime";

  return (
    <form action={formAction}>
      <Fieldset>
        <div className="flex">
          <Legend color={color} className="ml-1 text-xl transition-colors">
            <b
              className={`transition-all ${isDebate ? "text-sm font-normal text-rose-400" : ""}`}>
              댓글
            </b>
            <Dot
              className={`mx-3 inline-block transition-colors ${isDebate ? "border-rose-300" : "border-lime-300"}}`}
            />
            <b
              className={`mr-1 transition-all ${isDebate ? "" : "text-sm font-normal text-lime-400"}`}>
              반박
            </b>{" "}
            작성
          </Legend>
          <Switch
            color="lime"
            checkedColor="rose"
            name="status"
            value="debate"
            checked={isDebate}
            onChange={setIsDebate}
          />
        </div>
      </Fieldset>
    </form>
  );
}
