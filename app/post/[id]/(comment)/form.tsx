"use client";

import { Field, Fieldset } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useFieldArray } from "react-hook-form";

import {
  type CommentFormValues,
  createCommentAction,
} from "#lib/actions/comment/createCommentAction.js";
import { useFormAction } from "#lib/hooks/useFormAction.js";
import { useCommentStatusStore } from "#lib/providers/CommentStatusStoreProvider.jsx";
import { ImageFormProvider } from "#lib/providers/ImageFormProvider.jsx";
import Dot from "#ui/Dot/Dot.jsx";
import {
  ErrorText,
  Label,
  Legend,
  SubmitButton,
  Switch,
  Textarea,
} from "#ui/formItems/index.jsx";
import ImageFields from "#ui/ImageForm/ImageFields.jsx";
import ImageForm from "#ui/ImageForm/ImageForm.jsx";

interface CommentFormProps {
  isLogin: boolean;
  postId: number;
  imagePath: string;
}

export default function CommentForm({
  isLogin,
  postId,
  imagePath,
}: CommentFormProps) {
  const { commentStatus, updateCommentStatus } = useCommentStatusStore(
    (store) => store
  );
  const router = useRouter();

  const onSuccess = useCallback(() => {
    router.refresh();
  }, [router]);
  const {
    register,
    control,
    formState: { errors },
    formAction,
    state,
  } = useFormAction<CommentFormValues>({
    action: createCommentAction.bind(null, postId),
    onSuccess,
    resetKey: "images",
    resetValue: [],
  });

  const imageArrayRegister = useCallback(
    (index: number) => register(`images.${index}.name`),
    [register]
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const isDebate = commentStatus === "debate";
  const color = isDebate ? "rose" : "lime";

  const handleSwitchChange = (checked: boolean) => {
    updateCommentStatus(checked ? "debate" : "normal");
  };

  const placeholder = isLogin
    ? isDebate
      ? "위 논란의 당사자로서 반박할 사항이 있다면 작성해주세요. 작성 시 게시글의 상태가 변경됩니다."
      : "반박 이외의 간단한 댓글을 작성해주세요."
    : `${isDebate ? "반박" : "댓글"}은 로그인 후 작성할 수 있습니다.`;

  return (
    <ImageFormProvider
      fields={fields}
      append={append}
      remove={remove}
      parentId={postId}>
      <form action={formAction} data-testid="comment-form">
        <Fieldset>
          <Field className="flex items-center">
            <Legend
              color={color}
              className="ml-1 mr-4 text-xl transition-colors">
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
              disabled={!isLogin}
              placeholder={placeholder}
              {...register("content")}
            />
          </Field>
          {isDebate && (
            <Field>
              <Label color={color}>스크린샷</Label>
              <ImageFields
                register={imageArrayRegister}
                imagePath={imagePath}
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
          <div className="flex justify-end max-sm:px-3">
            <SubmitButton color={color} className="ml-auto transition-colors">
              작성
            </SubmitButton>
          </div>
        </Fieldset>
      </form>
      <ImageForm />
    </ImageFormProvider>
  );
}
