"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
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
