"use client";

import { Input } from "@headlessui/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { useImageFormContext } from "#lib/providers/ImageFormProvider.jsx";
import type { FormColor } from "#lib/types/property.js";
import { supabaseLoader } from "#lib/utils/supabase/imagePath.js";
import ErrorText from "#ui/formItems/ErrorText.jsx";
import UploadButton from "#ui/ImageForm/UploadButton.jsx";
import ImageModal from "#ui/ImageModal/ImageModal.jsx";

interface ImageFieldsProps {
  register: (index: number) => UseFormRegisterReturn<`images.${number}.name`>;
  imagePath: string;
  colorStyle: FormColor;
}

export default function ImageFields({
  register,
  imagePath,
  colorStyle,
}: ImageFieldsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { fields, handleUploadClick, remove, isPending, errors } =
    useImageFormContext();

  const images = useMemo(() => fields.map(({ name }) => name), [fields]);

  return (
    <>
      <div className="mb-1 flex gap-2">
        <UploadButton
          imageCount={fields.length}
          colorStyle={colorStyle}
          loading={isPending}
          onClick={handleUploadClick}
        />
        <ul className="flex gap-2">
          {fields.map(({ name, id }, index) => (
            <li key={id} className="relative">
              <Image
                src={`${imagePath}/${name}`}
                alt={name}
                width={112}
                height={112}
                loader={supabaseLoader}
                className="cursor-pointer rounded-md border-2 hover:opacity-80"
                onClick={() => setIsOpen(true)}
              />
              <button
                type="button"
                className="absolute right-0 top-0 size-7 rotate-45 border bg-white opacity-50 hover:opacity-100"
                onClick={() => remove(index)}>
                +
              </button>
              <Input type="hidden" {...register(index)} />
            </li>
          ))}
        </ul>
        <ImageModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          imagePath={imagePath}
          images={images}
        />
      </div>
      {errors.map((error) => (
        <ErrorText key={error}>{error}</ErrorText>
      ))}
    </>
  );
}
