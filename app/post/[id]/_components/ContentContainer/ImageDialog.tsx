"use client";

import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { type Dispatch, type SetStateAction, useCallback } from "react";

import ImageItem from "#app/post/[id]/_components/ContentContainer/ImageItem.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "#components/ui/carousel.jsx";
import type { PostInfo } from "#lib/types/response.js";

interface ImageDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  images: PostInfo["images"];
  imagePath: string;
}

export default function ImageDialog({
  isOpen,
  setIsOpen,
  imagePath,
  images,
}: ImageDialogProps) {
  const handleCloseClick = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Dialog open={isOpen} onClose={handleCloseClick} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/70" />
      <div className="fixed inset-0 flex h-screen w-screen items-center justify-center p-4">
        <CloseButton className="absolute right-4 top-4 z-10 cursor-pointer opacity-80 hover:opacity-50">
          <IoClose className="size-8 fill-neutral-200" />
        </CloseButton>
        <DialogPanel>
          <Carousel>
            <CarouselContent>
              {images.map((name) => (
                <CarouselItem key={name} className="h-screen w-screen">
                  <ImageItem
                    imagePath={imagePath}
                    name={name}
                    width={500}
                    height={800}
                    className="size-full object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
