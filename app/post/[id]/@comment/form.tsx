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
import { useCommentStatusStore } from "#lib/providers/CommentStatusStoreProvider.jsx";
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
  const { commentStatus, updateCommentStatus } = useCommentStatusStore(
    (store) => store
  );
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

  const isDebate = commentStatus === "debate";
  const color = isDebate ? "rose" : "lime";

  const handleSwitchChange = (checked: boolean) => {
    updateCommentStatus(checked ? "debate" : "normal");
  };

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
              color={isDebate ? "rose" : "lime"}
              className={`mx-3 inline-block transition-colors`}
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
            onChange={handleSwitchChange}
          />
        </div>
      </Fieldset>
    </form>
  );
}