"use client";

import { Field, Fieldset } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { type ComponentProps, useCallback } from "react";

import {
  type CommentUpdateFormValues,
  updateCommentAction,
} from "#lib/actions/updateCommentAction.js";
import { useFormAction } from "#lib/hooks/useFormAction.js";
import type { CommentInfo } from "#lib/types/response.js";
import Button from "#ui/Button/Button.jsx";
import { SubmitButton, Textarea } from "#ui/formItems/index.jsx";

interface UpdateFormProps extends ComponentProps<"form"> {
  comment: Pick<CommentInfo, "id" | "content" | "images">;
  isDebate: boolean;
  onUpdateClick: (value: boolean) => void;
}

export default function UpdateForm({
  comment: { id, content, images },
  isDebate,
  onUpdateClick,
  className = "",
  ...props
}: UpdateFormProps) {
  const router = useRouter();

  const onSuccess = useCallback(() => {
    router.refresh();
    onUpdateClick(false);
  }, [router, onUpdateClick]);
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
    <form action={formAction} className={className} {...props}>
      <Fieldset>
        <Field className="my-3 max-sm:px-3">
          <Textarea
            color={color}
            className="w-full"
            required
            minLength={2}
            maxLength={9999}
            defaultValue={content}
            {...register("content")}
          />
        </Field>
        <div className="flex justify-end gap-3 max-sm:px-3">
          <Button
            color={color}
            theme="sub"
            className="transition-colors"
            onClick={() => onUpdateClick(false)}>
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
