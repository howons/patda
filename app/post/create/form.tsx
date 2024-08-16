"use client";

import { Field, Fieldset } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Controller, useFieldArray, type UseFormProps } from "react-hook-form";

import {
  createPostAction,
  type FormValues,
} from "#lib/actions/post/createPostAction.js";
import { updatePostAction } from "#lib/actions/post/updatePostAction.js";
import {
  PLATFORM_COLOR,
  PLATFORM_NAME,
  PLATFORM_PLACEHOLDER,
} from "#lib/constants/platform.js";
import { TAG_DESC, TAG_NAMES } from "#lib/constants/tag.js";
import { type OnSuccess, useFormAction } from "#lib/hooks/useFormAction.js";
import { useImageFormContext } from "#lib/providers/ImageFormProvider.jsx";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import type { Platform, TagId } from "#lib/types/property.js";
import type { PostInfo } from "#lib/types/response.js";
import Logo from "#public/당근빳다.svg";
import Button from "#ui/Button/Button.jsx";
import CancelButton from "#ui/Button/CancelButton.jsx";
import {
  ErrorText,
  Input,
  Label,
  Legend,
  RadioTabs,
  Select,
  SubmitButton,
  Textarea,
} from "#ui/formItems/index.jsx";
import HelpCircle from "#ui/HelpCircle/HelpCircle.jsx";
import UploadButton from "#ui/ImageForm/UploadButton.jsx";

const platformOptions = Object.entries(PLATFORM_NAME).map(([id, name]) => ({
  name,
  value: id as Platform,
}));
const tagOptions = Object.entries(TAG_NAMES).map(([id, name]) => ({
  id: id as TagId,
  name,
  description: TAG_DESC[id as TagId],
}));
interface PostFormProps
  extends Partial<
    Pick<
      PostInfo,
      | "id"
      | "content"
      | "etcPlatformName"
      | "images"
      | "platform"
      | "tag"
      | "targetNickname"
      | "additionalInfo"
    >
  > {}

export default function PostForm({
  id,
  content,
  etcPlatformName,
  additionalInfo,
  images,
  platform: initPlatform,
  tag,
  targetNickname,
}: PostFormProps) {
  const isUpdate = id !== undefined;

  const [saveLoading, setSaveLoading] = useState(false);
  const { platform, updatePlatform } = usePlatformStore((store) => store);
  const router = useRouter();

  const color = PLATFORM_COLOR[platform];

  const onSuccess: OnSuccess = useCallback(
    (state) => {
      const postId = isUpdate ? id : state.resultId;
      router.push(`/post/${postId}`);
    },
    [router, id, isUpdate]
  );

  let useFormProps: UseFormProps<FormValues> | undefined;
  if (isUpdate) {
    useFormProps = {
      defaultValues: {
        content,
        etcPlatformName,
        images: images?.map((image) => ({ id: image })) ?? null,
        platform: initPlatform,
        tag,
        targetNickname,
        additionalInfo,
      },
    };
  }

  const {
    register,
    control,
    formState: { errors },
    formAction,
  } = useFormAction<FormValues>({
    action: isUpdate ? updatePostAction.bind(null, id) : createPostAction,
    onSuccess,
    useFormProps,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const { handleUploadClick } = useImageFormContext();

  const handleSelectChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      updatePlatform(e.target.value as Platform);
    },
    [updatePlatform]
  );

  useEffect(() => {
    if (!initPlatform) return;

    updatePlatform(initPlatform);
  }, [initPlatform, updatePlatform]);

  return (
    <form
      action={formAction}
      className="flex w-full min-w-80 max-w-3xl flex-col justify-between px-3 md:w-5/6"
      data-testid="post-form">
      <Fieldset className="space-y-6">
        <div className="mt-8 flex items-center justify-between">
          <Legend color={color} className="group flex break-keep">
            중고거래 진상 박제글 작성
            <Logo className="ml-1 size-8 origin-[25%_75%] group-hover:animate-swing" />
          </Legend>
          <CancelButton />
        </div>
        <div className="flex gap-6">
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
          <div className="flex-1 flex-col">
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
            <Field className="mt-2 flex flex-col">
              <Label className="flex items-center">
                추가 정보
                <HelpCircle className="ml-2">
                  상대방을 특정하는데 도움이 될 추가 정보를 적어주세요.
                </HelpCircle>
              </Label>
              <Input
                type="text"
                placeholder={PLATFORM_PLACEHOLDER[platform]}
                {...register("additionalInfo")}
              />
              <ErrorMessage
                name="additionalInfo"
                errors={errors}
                render={({ message }) => <ErrorText>{message}</ErrorText>}
              />
            </Field>
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
                defaultValue={isUpdate ? tag : "others"}
                onChange={field.onChange}
                items={tagOptions}
              />
            )}
          />
        </Field>
        <Field>
          <Label>스크린샷</Label>
          <UploadButton
            imageCount={fields.length}
            color={PLATFORM_COLOR[platform]}
            onClick={handleUploadClick}
          />
          <ul>
            {fields.map((item, index) => (
              <li key={item.id}>
                <Input type="hidden" {...register(`images.${index}.id`)} />
              </li>
            ))}
          </ul>
        </Field>
        <Field>
          <Label>상세 설명</Label>
          <Textarea
            color={PLATFORM_COLOR[platform]}
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
          color={PLATFORM_COLOR[platform]}
          loading={saveLoading}
          onClick={() => {
            setSaveLoading(true);
            setTimeout(() => setSaveLoading(false), 3000);
          }}>
          임시 저장
        </Button>
        <SubmitButton color={PLATFORM_COLOR[platform]}>작성</SubmitButton>
      </div>
    </form>
  );
}
