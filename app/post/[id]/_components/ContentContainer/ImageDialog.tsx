"use client";

import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { type Dispatch, type SetStateAction } from "react";

import ImageItem from "#app/post/[id]/_components/ContentContainer/ImageItem.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "#components/ui/carousel.jsx";
import useCarouselCount from "#lib/hooks/useCarouselCount.js";
import usePopstate from "#lib/hooks/usePopstate.js";
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
  const { handleExternalPopAction: handleCloseClick } = usePopstate({
    onPopstate: () => setIsOpen(false),
    condition: isOpen,
  });

  const { setApi, current, count } = useCarouselCount();

  return (
    <Dialog open={isOpen} onClose={handleCloseClick} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/70" />
      <div className="fixed inset-0 flex h-screen w-screen items-center justify-center p-4">
        <DialogPanel>
          <Carousel setApi={setApi}>
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
        <div className="absolute bottom-4 right-4 text-neutral-200/80">
          {current} / {count}
        </div>
        <CloseButton className="absolute right-4 top-4 cursor-pointer opacity-80 hover:opacity-50">
          <IoClose className="size-8 fill-neutral-200" />
        </CloseButton>
      </div>
    </Dialog>
  );
}
