"use client";

import { Input } from "@headlessui/react";
import Image from "next/image";
import { type UseFormRegister } from "react-hook-form";

import type { FormValues } from "#lib/actions/post/createPostAction.js";
import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import { useImageFormContext } from "#lib/providers/ImageFormProvider.jsx";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import UploadButton from "#ui/ImageForm/UploadButton.jsx";
import supabaseLoader from "#utils/supabase/loader.js";

interface ImageFieldsProps {
  register: UseFormRegister<FormValues>;
}

export default function ImageFields({ register }: ImageFieldsProps) {
  const platform = usePlatformStore((state) => state.platform);

  const { fields, handleUploadClick, remove } = useImageFormContext();

  return (
    <div className="flex gap-2">
      <UploadButton
        imageCount={fields.length}
        color={PLATFORM_COLOR[platform]}
        onClick={handleUploadClick}
      />
      <ul className="flex gap-2">
        {fields.map(({ path }, index) => (
          <li key={path} className="relative">
            <Image
              src={path}
              alt={`${index + 1}번째 이미지`}
              width={96}
              height={96}
              loader={supabaseLoader}
              className="rounded-md border-2"
            />
            <button
              type="button"
              className="absolute right-0 top-0 size-7 rotate-45 border bg-white opacity-50 transition-opacity hover:opacity-100"
              onClick={() => remove(index)}>
              +
            </button>
            <Input type="hidden" {...register(`images.${index}.path`)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
