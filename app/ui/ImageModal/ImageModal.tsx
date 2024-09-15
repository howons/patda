"use client";

import { type Dispatch, type SetStateAction } from "react";

import ImageItem from "#app/post/[id]/_components/ContentContainer/ImageItem.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "#components/ui/carousel.jsx";
import useCarouselCount from "#lib/hooks/useCarouselCount.js";
import type { PostInfo } from "#lib/types/response.js";
import FullScreenModal from "#ui/ImageModal/FullScreenModal.jsx";

interface ImageModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  images: PostInfo["images"];
  imagePath: string;
}

export default function ImageModal({
  isOpen,
  setIsOpen,
  imagePath,
  images,
}: ImageModalProps) {
  const { setApi, current, count } = useCarouselCount();

  return (
    <FullScreenModal isOpen={isOpen} setIsOpen={setIsOpen}>
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
      <div className="absolute bottom-4 right-4 text-neutral-200/80">
        {current} / {count}
      </div>
    </FullScreenModal>
  );
}
