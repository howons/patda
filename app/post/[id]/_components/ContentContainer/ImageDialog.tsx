"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { type Dispatch, type SetStateAction, useCallback } from "react";

import ImageItem from "#app/post/[id]/_components/ContentContainer/ImageItem.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
      <div className="fixed inset-0 flex h-screen w-screen items-center justify-center p-4">
        <DialogPanel>
          <Carousel className={""}>
            <CarouselContent>
              {images.map((name) => (
                <CarouselItem key={name}>
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
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
