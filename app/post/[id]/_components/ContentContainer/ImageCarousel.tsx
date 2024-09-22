"use client";

import { type ComponentProps, useCallback, useState } from "react";

import ImageItem from "#app/post/[id]/_components/ContentContainer/ImageItem.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "#components/ui/carousel.jsx";
import type { PostInfo } from "#lib/types/response.js";
import ImageModal from "#ui/ImageModal/ImageModal.jsx";
import { cn } from "#utils/utils.js";

interface ImageCarouselProps extends ComponentProps<"div"> {
  images: PostInfo["images"];
  imagePath: string;
}

export default function ImageCarousel({
  images,
  imagePath,
  className,
  ...props
}: ImageCarouselProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <Carousel className={cn("mx-5", className)} {...props}>
        <CarouselContent>
          {images.map((name) => (
            <CarouselItem
              key={name}
              className="sm:basis-1/2 lg:basis-1/3"
              onClick={handleItemClick}>
              <ImageItem
                imagePath={imagePath}
                name={name}
                width={350}
                height={650}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <ImageModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        images={images}
        imagePath={imagePath}
      />
    </>
  );
}
