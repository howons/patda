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
import { ImageFormProvider } from "#lib/providers/ImageFormProvider.jsx";
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
import ImageFields from "#ui/ImageForm/ImageFields.jsx";
import ImageForm from "#ui/ImageForm/ImageForm.jsx";

const platformOptions = Object.entries(PLATFORM_NAME).map(([id, name]) => ({
  name,
  value: id as Platform,
}));
const tagOptions = Object.entries(TAG_NAMES).map(([id, name]) => ({
  id: id as TagId,
  name,
  description: TAG_DESC[id as TagId],
}));
interface PostFormProps {
  imagePath: string;
  defaultValues?: Pick<
    PostInfo,
    | "content"
    | "etcPlatformName"
    | "images"
    | "platform"
    | "tag"
    | "targetNickname"
    | "additionalInfo"
  >;
  id?: PostInfo["id"];
}

export default function PostForm({
  imagePath,
  defaultValues,
  id,
}: PostFormProps) {
  const isUpdate = defaultValues !== undefined && id !== undefined;

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
        ...defaultValues,
        images: defaultValues.images.map((name) => ({ name })),
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

  const imageArrayRegister = useCallback(
    (index: number) => register(`images.${index}.name`),
    [register]
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const handleSelectChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      updatePlatform(e.target.value as Platform);
    },
    [updatePlatform]
  );

  const initPlatform = defaultValues?.platform;

  useEffect(() => {
    if (!initPlatform) return;

    updatePlatform(initPlatform);
  }, [updatePlatform, initPlatform]);

  return (
    <ImageFormProvider fields={fields} append={append} remove={remove} id={id}>
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
                <Label color={color}>거래 사이트</Label>
                <Select
                  options={platformOptions}
                  color={color}
                  className="block"
                  {...register("platform", {
                    onChange: handleSelectChange,
                    value: platform,
                  })}
                />
              </Field>
              {platform === "etc" && (
                <Field className="mt-2 flex flex-col">
                  <Label color={color}>사이트 이름</Label>
                  <Input
                    color={color}
                    type="text"
                    {...register("etcPlatformName")}
                  />
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
                <Label color={color}>상대 닉네임</Label>
                <Input
                  color={color}
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
                <Label color={color} className="flex items-center">
                  추가 정보
                  <HelpCircle className="ml-2">
                    상대방을 특정하는데 도움이 될 추가 정보를 적어주세요.
                  </HelpCircle>
                </Label>
                <Input
                  color={color}
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
            <Label color={color}>사유</Label>
            <Controller
              control={control}
              name="tag"
              render={({ field }) => (
                <RadioTabs<TagId>
                  color={color}
                  name="tag"
                  defaultValue={isUpdate ? defaultValues.tag : "others"}
                  onChange={field.onChange}
                  items={tagOptions}
                />
              )}
            />
          </Field>
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
          <Field>
            <Label color={color}>상세 설명</Label>
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
            colorStyle={PLATFORM_COLOR[platform]}
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
      <ImageForm />
    </ImageFormProvider>
  );
}
