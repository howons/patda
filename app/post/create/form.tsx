"use client";

import { Field, Fieldset } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { Session } from "next-auth";
import { ChangeEvent, useCallback, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";

import { createPost, FormValues } from "#lib/actions/createPostAction";
import { PLATFORM_NAME } from "#lib/constants/platform";
import { TAG_DESC, TAG_NAMES } from "#lib/constants/tag";
import { OnSuccess, useFormAction } from "#lib/hooks/useFormAction";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider";
import { Platform, TagId } from "#lib/types/property";
import Logo from "#public/당근빳다.svg";
import Button from "#ui/Button/Button";
import CancelButton from "#ui/Button/CancelButton";
import {
  ErrorText,
  Input,
  Label,
  Legend,
  RadioTabs,
  Select,
  SubmitButton,
  Textarea,
} from "#ui/formItems/index";

const platformOptions = Object.entries(PLATFORM_NAME).map(([id, name]) => ({
  name,
  value: id as Platform,
}));
const tagOptions = Object.entries(TAG_NAMES).map(([id, name]) => ({
  id: id as TagId,
  name,
  description: TAG_DESC[id as TagId],
}));

interface PostCreateFormProps {
  session: Session | null;
}

function PostCreateForm({ session }: PostCreateFormProps) {
  const [saveLoading, setSaveLoading] = useState(false);
  const { platform, updatePlatform } = usePlatformStore((store) => store);

  const onSuccess: OnSuccess = useCallback((state) => {
    alert("post" + state.resultId);
  }, []);
  const {
    register,
    control,
    formState: { errors },
    formAction,
  } = useFormAction<FormValues>({ action: createPost, onSuccess });
  const { fields, append, remove } = useFieldArray<FormValues>({
    control,
    name: "images",
  });

  const handleSelectChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      updatePlatform(e.target.value as Platform);
    },
    [updatePlatform]
  );

  return (
    <form
      action={formAction}
      className="flex w-5/6 min-w-[22rem] max-w-3xl grow flex-col justify-between md:w-4/6"
      data-testid="post-create-form">
      <Fieldset className="space-y-6">
        <div className="mt-8 flex items-center justify-between">
          <Legend className="group flex">
            중고거래 진상 박제글 작성
            <Logo className="ml-1 size-8 origin-[25%_75%] group-hover:animate-swing" />
          </Legend>
          <CancelButton />
        </div>
        <div className="flex justify-between gap-7">
          <div className="flex-1">
            <Field className="flex flex-col">
              <Label>거래 사이트</Label>
              <Select
                options={platformOptions}
                className="block"
                {...register("platform", {
                  onChange: handleSelectChange,
                  value: platform,
                })}
              />
            </Field>
            {platform === "etc" && (
              <Field className="mt-2 flex flex-col">
                <Label>사이트 이름</Label>
                <Input type="text" {...register("etcPlatformName")} />
                <ErrorMessage
                  name="etcPlatformName"
                  errors={errors}
                  render={({ message }) => <ErrorText>{message}</ErrorText>}
                />
              </Field>
            )}
          </div>
          <div className="flex-1">
            <Field className="flex flex-col">
              <Label>상대 닉네임</Label>
              <Input
                type="text"
                className="block w-full"
                {...register("targetNickname")}
              />
              <ErrorMessage
                name="targetNickname"
                errors={errors}
                render={({ message }) => <ErrorText>{message}</ErrorText>}
              />
            </Field>
            {!session && (
              <Field className="mt-2 flex flex-col">
                <Label>본인 닉네임</Label>
                <Input
                  type="text"
                  className="block w-full"
                  {...register("anonymousUserNickname")}
                />
                <ErrorMessage
                  name="anonymousUserNickname"
                  errors={errors}
                  render={({ message }) => <ErrorText>{message}</ErrorText>}
                />
              </Field>
            )}
          </div>
        </div>
        <Field>
          <Label>사유</Label>
          <Controller
            control={control}
            name="tag"
            render={({ field }) => (
              <RadioTabs<TagId>
                name="tag"
                defaultValue="others"
                onChange={field.onChange}
                items={tagOptions}
              />
            )}
          />
        </Field>
        <Field>
          <Label>스크린샷</Label>
          <ul>
            {fields.map((item, index) => (
              <li key={item.id}>
                <Input type="hidden" {...register(`images.${index}.name`)} />
                <Input type="hidden" {...register(`images.${index}.url`)} />
              </li>
            ))}
          </ul>
        </Field>
        <Field>
          <Label>상세 설명</Label>
          <Textarea
            className="block w-full resize-y"
            required
            minLength={30}
            maxLength={1000}
            {...register("content")}
          />
          <ErrorMessage
            name="content"
            errors={errors}
            render={({ message }) => <ErrorText>{message}</ErrorText>}
          />
        </Field>
      </Fieldset>
      <div className="mt-6 flex justify-end gap-6">
        <Button
          loading={saveLoading}
          onClick={() => {
            setSaveLoading(true);
            setTimeout(() => setSaveLoading(false), 3000);
          }}>
          임시 저장
        </Button>
        <SubmitButton>작성</SubmitButton>
      </div>
    </form>
  );
}

export default PostCreateForm;
