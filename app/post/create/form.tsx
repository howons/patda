"use client";

import { Field, Fieldset } from "@headlessui/react";
import { createPost, type FormValues } from "@lib/actions/postCreateAction";
import { PLATFORM_NAME } from "@lib/constants/platform";
import { TAG_DESC, TAG_NAMES } from "@lib/constants/tag";
import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { Platform, TagId } from "@lib/types/property";
import { Input, Label, Legend, Textarea } from "@ui/formItems";
import FormButton from "@ui/formItems/FormButton";
import RadioTabs from "@ui/formItems/RadioTabs";
import Select from "@ui/formItems/Select";
import { ChangeEvent, useCallback } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

import Logo from "@/public/당근빳다.svg";

const platformOptions = Object.entries(PLATFORM_NAME).map(([id, name]) => ({
  name,
  value: id as Platform,
}));
const tagOptions = Object.entries(TAG_NAMES).map(([id, name]) => ({
  id: id as TagId,
  name,
  description: TAG_DESC[id as TagId],
}));

function PostCreateForm() {
  const [state, formAction] = useFormState(createPost, null);
  const { register } = useForm<FormValues>();
  const updatePlatform = usePlatformStore((store) => store.updatePlatform);

  const handleSelectChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      updatePlatform(e.target.value as Platform);
    },
    [updatePlatform]
  );

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
            <Select
              options={platformOptions}
              className="block"
              {...register("platform", { onChange: handleSelectChange })}
            />
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
          <RadioTabs<TagId>
            name="tags"
            defaultValue="others"
            items={tagOptions}
          />
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
