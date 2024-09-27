"use client";

import { Field, Fieldset } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";
import { type ComponentProps, useCallback } from "react";
import { useFieldArray } from "react-hook-form";

import {
  type CommentUpdateFormValues,
  updateCommentAction,
} from "#lib/actions/comment/updateCommentAction.js";
import { useFormAction } from "#lib/hooks/useFormAction.js";
import { useCommentContext } from "#lib/providers/CommentProvider.jsx";
import { ImageFormProvider } from "#lib/providers/ImageFormProvider.jsx";
import { getImagePath } from "#lib/utils/supabase/imagePath.js";
import Button from "#ui/Button/Button.jsx";
import {
  ErrorText,
  Label,
  SubmitButton,
  Textarea,
} from "#ui/formItems/index.jsx";
import ImageFields from "#ui/ImageForm/ImageFields.jsx";
import ImageForm from "#ui/ImageForm/ImageForm.jsx";

interface UpdateFormProps extends ComponentProps<"form"> {
  isDebate: boolean;
  onUpdateClick: (value: boolean) => void;
}

export default function UpdateForm({
  isDebate,
  onUpdateClick,
  className = "",
  ...props
}: UpdateFormProps) {
  const { id, content, images } = useCommentContext();

  const router = useRouter();

  const onSuccess = useCallback(() => {
    router.refresh();
    onUpdateClick(false);
  }, [router, onUpdateClick]);
  const {
    register,
    control,
    formState: { errors },
    formAction,
    state,
  } = useFormAction<CommentUpdateFormValues>({
    action: updateCommentAction.bind(null, id),
    onSuccess,
    useFormProps: {
      defaultValues: {
        content,
        images: images.map((name) => ({ name })),
      },
    },
  });

  const imageArrayRegister = useCallback(
    (index: number) => register(`images.${index}.name`),
    [register]
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const color = isDebate ? "rose" : "lime";

  return (
    <ImageFormProvider fields={fields} append={append} remove={remove} id={id}>
      <form action={formAction} className={className} {...props}>
        <Fieldset>
          <Field className="my-3 max-sm:px-3">
            <Textarea
              colorStyle={color}
              className="w-full"
              required
              minLength={2}
              maxLength={9999}
              defaultValue={content}
              {...register("content")}
            />
          </Field>
          {isDebate && (
            <Field>
              <Label colorStyle={color}>스크린샷</Label>
              <ImageFields
                register={imageArrayRegister}
                imagePath={getImagePath({ commentId: id })}
                color={color}
              />
              <ErrorMessage
                name="images"
                errors={errors}
                render={({ message }) => <ErrorText>{message}</ErrorText>}
              />
            </Field>
          )}
          {state.status === "ERROR_INTERNAL" ||
            (state.status === "ERROR_DATABASE" && (
              <ErrorText>{state.message}</ErrorText>
            ))}
          <div className="flex justify-end gap-3 max-sm:px-3">
            <Button
              colorStyle={color}
              intent="secondary"
              className="transition-colors"
              onClick={() => onUpdateClick(false)}>
              취소
            </Button>
            <SubmitButton colorStyle={color} className="transition-colors">
              작성
            </SubmitButton>
          </div>
        </Fieldset>
      </form>
      <ImageForm />
    </ImageFormProvider>
  );
}
