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
import { ERROR } from "#lib/constants/messages.js";

const IMAGE_ERRORS: { [key: string]: string } = {
  "413": ERROR.IMAGE.MAX_IMAGE_SIZE,
  "500": ERROR.IMAGE.NO_RESULT_DB,
  "503": ERROR.IMAGE.NO_RESULT_DB,
};

interface ImageFormValue {
  inputRef: RefObject<HTMLInputElement>;
  isPending: boolean;
  fields: FieldArrayWithId<FormValues>[];
  errors: string[];
  remove: UseFieldArrayRemove;
  handleUploadClick: () => void;
  handleFileChange: ChangeEventHandler<HTMLInputElement>;
}

const ImageFormContext = createContext<ImageFormValue | null>(null);

interface ImageFormProviderProps {
  control: Control<FormValues>;
  children: ReactNode;
  postId?: number;
}

export const ImageFormProvider = ({
  control,
  children,
  postId,
}: ImageFormProviderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTranstion] = useTransition();
  const [errors, setErrors] = useState<string[]>([]);

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
        const imageState = await uploadImageAction(
          imageCount,
          formData,
          postId
        );
        if (imageState.status === "SUCCESS" && imageState.resultImages) {
          const imageNames = fields.map((field) => field.name);
          const newImages = imageState.resultImages.filter(
            (name) => !imageNames.includes(name) && !isErrorCode(name)
          );
          if (newImages.length > 0) {
            append(newImages.map((name) => ({ name })));
          }

          if (newImages.length !== imageState.resultImages.length) {
            imageState.resultImages.map((image) => {
              if (isErrorCode(image) && !errors.includes(IMAGE_ERRORS[image])) {
                setErrors([...errors, IMAGE_ERRORS[image]]);
              }
            });
          } else {
            setErrors([]);
          }
        }
      });
    },
    [append, errors, fields, imageCount, postId]
  );

  const value: ImageFormValue = useMemo(
    () => ({
      inputRef,
      isPending,
      fields,
      errors,
      remove,
      handleUploadClick,
      handleFileChange,
    }),
    [errors, fields, handleFileChange, handleUploadClick, isPending, remove]
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

function isErrorCode(image: string) {
  return image.length <= 3;
}
