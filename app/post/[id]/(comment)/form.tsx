"use client";

import { Field, Fieldset } from "@headlessui/react";
import { useRouter } from "next/navigation";
import type { Session } from "next-auth";
import { useCallback } from "react";

import {
  type CommentFormValues,
  createCommentAction,
} from "#lib/actions/comment/createCommentAction.js";
import { useFormAction } from "#lib/hooks/useFormAction.js";
import { useCommentStatusStore } from "#lib/providers/CommentStatusStoreProvider.jsx";
import Dot from "#ui/Dot/Dot.jsx";
import {
  ErrorText,
  Legend,
  SubmitButton,
  Switch,
  Textarea,
} from "#ui/formItems/index.jsx";

interface CommentFormProps {
  session: Session | null;
  postId: number;
}

export default function CommentForm({ session, postId }: CommentFormProps) {
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
    state,
  } = useFormAction<CommentFormValues>({
    action: createCommentAction.bind(null, postId),
    onSuccess,
  });

  const isDebate = commentStatus === "debate";
  const color = isDebate ? "rose" : "lime";

  const handleSwitchChange = (checked: boolean) => {
    updateCommentStatus(checked ? "debate" : "normal");
  };

  const placeholder = session
    ? isDebate
      ? "위 논란의 당사자로서 반박할 사항이 있다면 작성해주세요. 작성 시 게시글의 상태가 변경됩니다."
      : "반박 이외의 간단한 댓글을 작성해주세요."
    : `${isDebate ? "반박" : "댓글"}은 로그인 후 작성할 수 있습니다.`;

  return (
    <form action={formAction} data-testid="comment-form">
      <Fieldset>
        <Field className="flex items-center">
          <Legend color={color} className="ml-1 mr-4 text-xl transition-colors">
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
            className="mt-1"
          />
        </Field>
        <Field className="my-3 max-sm:px-3">
          <Textarea
            color={color}
            className="w-full"
            required
            minLength={2}
            maxLength={9999}
            disabled={!session}
            placeholder={placeholder}
            {...register("content")}
          />
        </Field>
        {state.status === "ERROR_INTERNAL" ||
          (state.status === "ERROR_DATABASE" && (
            <ErrorText>{state.message}</ErrorText>
          ))}
        <div className="flex justify-end max-sm:px-3">
          <SubmitButton color={color} className="ml-auto transition-colors">
            작성
          </SubmitButton>
        </div>
      </Fieldset>
    </form>
  );
}
