"use client";

import { Input } from "@headlessui/react";
import Image from "next/image";
import { useEffect } from "react";
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
import supabaseLoader from "#utils/supabase/loader.js";

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

  useEffect(() => {
    if (imageState.status === "SUCCESS" && imageState.resultImages) {
      const imagePathes = fields.map((field) => field.path);
      const newImages = imageState.resultImages.filter(
        (path) => !imagePathes.includes(path)
      );

      if (newImages.length <= 0) return;

      append(newImages.map((path) => ({ path })));
    }
  }, [append, fields, imageState]);

  return (
    <>
      <UploadButton
        imageCount={fields.length}
        color={PLATFORM_COLOR[platform]}
        onClick={handleUploadClick}
      />
      <ul>
        {fields.map(({ path }, index) => (
          <li key={path}>
            <Image
              src={path}
              alt={`${index + 1}번째 이미지`}
              width={200}
              height={200}
              loader={supabaseLoader}
            />
            <Input type="hidden" {...register(`images.${index}.path`)} />
          </li>
        ))}
      </ul>
    </>
  );
}
