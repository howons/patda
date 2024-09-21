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
  type FieldArrayMethodProps,
  type FieldArrayWithId,
  type UseFieldArrayRemove,
} from "react-hook-form";

import { uploadImageAction } from "#lib/actions/image/uploadImageAction.js";
import { MAX_IMAGE_COUNT } from "#lib/constants/image.js";
import { ERROR } from "#lib/constants/messages.js";

const IMAGE_ERRORS: { [key: string]: string } = {
  "413": ERROR.IMAGE.MAX_IMAGE_SIZE,
  "500": ERROR.IMAGE.NO_RESULT_DB,
  "503": ERROR.IMAGE.NO_RESULT_DB,
};

type ImageFormFields = {
  images: { name: string }[];
};

interface ImageFormValue {
  inputRef: RefObject<HTMLInputElement>;
  isPending: boolean;
  fields: FieldArrayWithId<ImageFormFields>[];
  remove: UseFieldArrayRemove;
  errors: string[];
  handleUploadClick: () => void;
  handleFileChange: ChangeEventHandler<HTMLInputElement>;
}

const ImageFormContext = createContext<ImageFormValue | null>(null);

interface ImageFormProviderProps {
  fields: FieldArrayWithId<ImageFormFields, "images", "id">[];
  append: (
    value:
      | {
          name: string;
        }
      | {
          name: string;
        }[],
    options?: FieldArrayMethodProps
  ) => void;
  remove: UseFieldArrayRemove;
  children: ReactNode;
  id?: number | string;
  parentId?: number;
}

export const ImageFormProvider = ({
  fields,
  append,
  remove,
  children,
  id,
  parentId,
}: ImageFormProviderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTranstion] = useTransition();
  const [errors, setErrors] = useState<string[]>([]);

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
          id,
          parentId
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
    [imageCount, id, parentId, fields, append, errors]
  );

  const value: ImageFormValue = useMemo(
    () => ({
      inputRef,
      isPending,
      fields,
      remove,
      errors,
      handleUploadClick,
      handleFileChange,
    }),
    [errors, fields, remove, handleFileChange, handleUploadClick, isPending]
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
