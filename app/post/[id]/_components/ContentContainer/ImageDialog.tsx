"use client";

import { Dialog } from "@headlessui/react";
import { type Dispatch, type SetStateAction, useCallback } from "react";

interface ImageDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ImageDialog({ isOpen, setIsOpen }: ImageDialogProps) {
  const handleCloseClick = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Dialog open={isOpen} onClose={handleCloseClick}>
      이미지
    </Dialog>
  );
}
