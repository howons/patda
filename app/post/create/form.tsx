"use client";

import { Field, Fieldset, Label, Legend, Textarea } from "@headlessui/react";
import { createPost, type FormValues } from "@lib/actions/postCreateAction";
import Input from "@ui/formItems/Input";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

function PostCreateForm() {
  const [state, formAction] = useFormState(createPost, null);
  const { register } = useForm<FormValues>();

  return (
    <form action={formAction}>
      <Fieldset>
        <Legend>중고거래 진상 박제</Legend>
        <div>
          <Field>
            <Label>거래 플랫폼</Label>
          </Field>
          <Field>
            <Label>상대 닉네임</Label>
            <Input type="text" {...register("targetNickname")} />
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
          <Textarea {...register("content")} />
        </Field>
      </Fieldset>
      <button>임시 저장</button>
      <button type="submit">작성</button>
    </form>
  );
}

export default PostCreateForm;
