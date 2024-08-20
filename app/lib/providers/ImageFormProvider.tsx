"use client";

import {
  type ChangeEventHandler,
  createContext,
  type ReactNode,
  type RefObject,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  type Control,
  type FieldArrayWithId,
  useFieldArray,
  type UseFieldArrayRemove,
} from "react-hook-form";

import { uploadImageAction } from "#lib/actions/image/uploadImageAction.js";
import type { FormValues } from "#lib/actions/post/createPostAction.js";
import { MAX_IMAGE_COUNT } from "#lib/constants/image.js";

interface ImageFormValue {
  inputRef: RefObject<HTMLInputElement>;
  isPending: boolean;
  fields: FieldArrayWithId<FormValues>[];
  remove: UseFieldArrayRemove;
  handleUploadClick: () => void;
  handleFileChange: ChangeEventHandler<HTMLInputElement>;
}

const ImageFormContext = createContext<ImageFormValue | null>(null);

interface ImageFormProviderProps {
  control: Control<FormValues>;
  children: ReactNode;
}

export const ImageFormProvider = ({
  control,
  children,
}: ImageFormProviderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTranstion] = useTransition();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });
  const imageCount = fields.length;

  const handleUploadClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const files = e.target.files;
      if (!files) return;

      const formData = new FormData();
      Array.from(files)
        .slice(0, MAX_IMAGE_COUNT - imageCount)
        .forEach((file, idx) => {
          formData.append(`image[${idx}]`, file);
        });

      startTranstion(async () => {
        const imageState = await uploadImageAction(imageCount, formData);

        if (imageState.status === "SUCCESS" && imageState.resultImages) {
          const imagePathes = fields.map((field) => field.path);
          const newImages = imageState.resultImages.filter(
            (path) => !imagePathes.includes(path)
          );

          if (newImages.length <= 0) return;

          append(newImages.map((path) => ({ path })));
        }
      });
    },
    [append, fields, imageCount]
  );

  const value: ImageFormValue = useMemo(
    () => ({
      inputRef,
      isPending,
      fields,
      remove,
      handleUploadClick,
      handleFileChange,
    }),
    [fields, handleFileChange, handleUploadClick, isPending, remove]
  );

  return (
    <ImageFormContext.Provider value={value}>
      {children}
    </ImageFormContext.Provider>
  );
};

export const useImageFormContext = () => {
  const imageFormContext = useContext(ImageFormContext);

  if (!imageFormContext) {
    throw new Error(`useImageFormContext must be use within ImageFormProvider`);
  }

  return imageFormContext;
};
