"use client";

import { Field, Fieldset } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { type Dispatch, type SetStateAction, useCallback } from "react";

import {
  type CommentUpdateFormValues,
  updateCommentAction,
} from "#lib/actions/updateCommentAction.js";
import { useFormAction } from "#lib/hooks/useFormAction.js";
import type { CommentInfo } from "#lib/types/response.js";
import Button from "#ui/Button/Button.jsx";
import { SubmitButton, Textarea } from "#ui/formItems/index.jsx";

interface UpdateFormProps {
  comment: Pick<CommentInfo, "id" | "content" | "images">;
  isDebate: boolean;
  setUpdateClicked: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateForm({
  comment: { id, content, images },
  isDebate,
  setUpdateClicked,
}: UpdateFormProps) {
  const router = useRouter();

  const onSuccess = useCallback(() => {
    router.refresh();
    setUpdateClicked(false);
  }, [router, setUpdateClicked]);
  const {
    register,
    formState: { errors },
    formAction,
  } = useFormAction<CommentUpdateFormValues>({
    action: updateCommentAction.bind(null, id),
    onSuccess,
  });

  const color = isDebate ? "rose" : "lime";

  return (
    <form action={formAction}>
      <Fieldset>
        <Field className="my-3 max-sm:px-3">
          <Textarea
            color={color}
            className="w-full"
            required
            minLength={2}
            maxLength={1000}
            defaultValue={content}
            {...register("content")}
          />
        </Field>
        <div className="flex justify-end gap-3 max-sm:px-3">
          <Button
            color={color}
            theme="sub"
            className="transition-colors"
            onClick={() => setUpdateClicked(false)}>
            취소
          </Button>
          <SubmitButton color={color} className="transition-colors">
            작성
          </SubmitButton>
        </div>
      </Fieldset>
    </form>
  );
}
