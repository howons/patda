"use client";

import { Field, Fieldset } from "@headlessui/react";
import { createPost, type FormValues } from "@lib/actions/postCreateAction";
import { Input, Label, Legend, Textarea } from "@ui/formItems";
import FormButton from "@ui/formItems/FormButton";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

import Logo from "@/public/당근빳다.svg";

function PostCreateForm() {
  const [state, formAction] = useFormState(createPost, null);
  const { register } = useForm<FormValues>();

  return (
    <form
      action={formAction}
      className="flex w-3/5 min-w-96 max-w-3xl grow flex-col justify-between">
      <Fieldset className="space-y-6">
        <Legend className="group mt-8 flex">
          중고거래 진상 박제글 작성
          <Logo className="ml-1 size-8 origin-[25%_75%] group-hover:animate-swing" />
        </Legend>
        <div className="flex justify-between gap-3">
          <Field className="flex-1">
            <Label>거래 플랫폼</Label>
          </Field>
          <Field className="flex-1">
            <Label>상대 닉네임</Label>
            <Input
              type="text"
              className="block w-full"
              {...register("targetNickname")}
            />
          </Field>
        </div>
        <Field>
          <Label>사유</Label>
          <Input type="hidden" {...register("tags")} />
        </Field>
        <Field>
          <Label>스크린샷</Label>
          <Input type="file" name="imageUrls" />
        </Field>
        <Field>
          <Label>상세 설명</Label>
          <Textarea
            className="block w-full resize-y"
            {...register("content")}
          />
        </Field>
      </Fieldset>
      <div className="mt-6 flex justify-end gap-6">
        <FormButton>임시 저장</FormButton>
        <FormButton type="submit" theme="primary">
          작성
        </FormButton>
      </div>
    </form>
  );
}

export default PostCreateForm;
