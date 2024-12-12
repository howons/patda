"use client";

import { Field, Fieldset } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useRef } from "react";
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
import useSyncInitPlatform from "#lib/hooks/useSyncInitPlatform.js";
import useTempSave from "#lib/hooks/useTempSave.js";
import { ImageFormProvider } from "#lib/providers/ImageFormProvider.jsx";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import type { Platform, TagId } from "#lib/types/property.js";
import type { PostInfo } from "#lib/types/response.js";
import Logo from "#public/당근빳다.svg";
import CancelButton from "#ui/Button/CancelButton.jsx";
import Dot from "#ui/Dot/Dot.jsx";
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
import TempSaveButton from "#ui/TempSave/TempSaveButton.jsx";
import TempSaveList from "#ui/TempSave/TempSaveList.jsx";
import { cn } from "#utils/utils.js";

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

  const { platform, updatePlatform } = usePlatformStore((store) => store);
  const router = useRouter();

  useSyncInitPlatform({ initPlatform: defaultValues?.platform });

  const color = PLATFORM_COLOR[platform];

  const deleteSuccessTempSave = useRef(() => {});
  const onSuccess: OnSuccess = useCallback(
    (state) => {
      deleteSuccessTempSave.current();

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
    getValues,
    formState: { errors },
    formAction,
    reset,
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

  const onTempSaveSelect = useCallback(
    (data: any) => {
      reset(data);

      if (data.platform) {
        updatePlatform(data.platform);
      }
    },
    [reset, updatePlatform]
  );

  const {
    tempSaveKey,
    tempSaveList,
    tempSaveEnabled,
    tempSaveVisible,
    saveData,
    selectTempSave,
    deleteTempSave,
  } = useTempSave({
    containerId: imagePath,
    onSelect: onTempSaveSelect,
  });

  deleteSuccessTempSave.current = useCallback(() => {
    if (tempSaveKey) {
      deleteTempSave(tempSaveKey);
    }
  }, [deleteTempSave, tempSaveKey]);

  const handleSaveClick = () => {
    const formValues = getValues();
    const valuesWithDate = { updatedAt: new Date(), ...formValues };
    return saveData(valuesWithDate);
  };

  return (
    <ImageFormProvider fields={fields} append={append} remove={remove} id={id}>
      <form
        action={formAction}
        className="flex w-full min-w-80 max-w-3xl flex-col justify-between px-3 md:w-5/6"
        data-testid="post-form">
        <Fieldset className="space-y-6">
          <div className="relative mt-8 flex items-center justify-between">
            <Legend colorStyle={color} className="group flex h-12 break-keep">
              중고거래 진상 박제글 작성
              <Logo className="ml-1 size-8 origin-[25%_75%] group-hover:animate-swing" />
            </Legend>
            {tempSaveEnabled && tempSaveList.length > 0 && (
              <TempSaveList
                colorStyle={color}
                tempSaveKey={tempSaveKey}
                tempSaveList={tempSaveList}
                categoryKey="platform"
                categoryValues={PLATFORM_NAME}
                titleKey="targetNickname"
                selectTempSave={selectTempSave}
                deleteTempSave={deleteTempSave}
                className={cn(
                  "absolute left-0 top-[5%] h-[90%] sm:w-3/4 w-full transition duration-500 -translate-y-8 opacity-0",
                  tempSaveVisible && "translate-y-0 opacity-100 z-10"
                )}
              />
            )}
            <CancelButton className="max-sm:hidden" />
          </div>
          <Dot colorStyle={color} className="mx-auto" />
          <div className="flex gap-6">
            <div className="flex-1">
              <Field className="flex flex-col">
                <Label colorStyle={color}>거래 사이트</Label>
                <Select
                  options={platformOptions}
                  colorStyle={color}
                  className="block"
                  {...register("platform", {
                    onChange: handleSelectChange,
                    value: platform,
                  })}
                />
              </Field>
              {platform === "etc" && (
                <Field className="mt-2 flex flex-col">
                  <Label colorStyle={color}>사이트 이름</Label>
                  <Input
                    colorStyle={color}
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
                <Label colorStyle={color}>상대 닉네임</Label>
                <Input
                  colorStyle={color}
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
                <Label colorStyle={color} className="flex items-center">
                  추가 정보
                  <HelpCircle className="ml-2">
                    상대방을 특정하는데 도움이 될 추가 정보를 적어주세요.
                  </HelpCircle>
                </Label>
                <Input
                  colorStyle={color}
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
            <Label colorStyle={color}>사유</Label>
            <Controller
              control={control}
              name="tag"
              render={({ field }) => (
                <RadioTabs<TagId>
                  colorStyle={color}
                  name="tag"
                  defaultValue={isUpdate ? defaultValues.tag : "others"}
                  value={field.value ?? "others"}
                  onChange={field.onChange}
                  items={tagOptions}
                />
              )}
            />
          </Field>
          <Field>
            <Label colorStyle={color}>스크린샷</Label>
            <ImageFields
              register={imageArrayRegister}
              imagePath={imagePath}
              colorStyle={color}
            />
            <ErrorMessage
              name="images"
              errors={errors}
              render={({ message }) => <ErrorText>{message}</ErrorText>}
            />
          </Field>
          <Field>
            <Label colorStyle={color}>상세 설명</Label>
            <Textarea
              colorStyle={color}
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
          <TempSaveButton colorStyle={color} onSaveClick={handleSaveClick} />
          <SubmitButton colorStyle={color}>작성</SubmitButton>
        </div>
      </form>
      <ImageForm />
    </ImageFormProvider>
  );
}
