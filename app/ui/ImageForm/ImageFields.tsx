"use client";

import { Input } from "@headlessui/react";
import {
  type Control,
  useFieldArray,
  type UseFormRegister,
} from "react-hook-form";

import type { FormValues } from "#lib/actions/post/createPostAction.js";
import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import { useImageFormContext } from "#lib/providers/ImageFormProvider.jsx";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import UploadButton from "#ui/ImageForm/UploadButton.jsx";

interface ImageFieldsProps {
  register: UseFormRegister<FormValues>;
  control: Control<FormValues>;
}

export default function ImageFields({ register, control }: ImageFieldsProps) {
  const platform = usePlatformStore((state) => state.platform);
  const { handleUploadClick, imageState } = useImageFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  return (
    <>
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
    </>
  );
}
