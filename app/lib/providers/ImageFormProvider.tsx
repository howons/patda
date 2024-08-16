"use client";

import {
  type ChangeEventHandler,
  createContext,
  type ReactNode,
  type RefObject,
  useContext,
  useRef,
} from "react";
import { useFormState } from "react-dom";

import { uploadImageAction } from "#lib/actions/image/uploadImageAction.js";
import type { ActionState } from "#lib/types/action.js";

interface ImageFormValue {
  inputRef: RefObject<HTMLInputElement>;
  imageState: ActionState;
  handleUploadClick: () => void;
  handleFileChange: ChangeEventHandler<HTMLInputElement>;
}

const ImageFormContext = createContext<ImageFormValue | null>(null);

interface ImageFormProviderProps {
  children: ReactNode;
}

export const ImageFormProvider = ({ children }: ImageFormProviderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [imageState, imageFormAction] = useFormState(uploadImageAction, {
    status: null,
  });

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (!files) return;

    const formData = new FormData();
    Array.from(files)
      .slice(0, 10)
      .forEach((file, idx) => {
        formData.append(`image[${idx}]`, file);
      });

    imageFormAction(formData);
  };

  const value: ImageFormValue = {
    inputRef,
    imageState,
    handleUploadClick,
    handleFileChange,
  };

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
