"use client";

import Image from "next/image";
import type { ComponentProps } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "#components/ui/carousel.jsx";
import type { PostInfo } from "#lib/types/response.js";
import supabaseLoader from "#lib/utils/supabase/loader.js";
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
  return (
    <Carousel className={cn(className, "mx-5")} {...props}>
      <CarouselContent>
        {images.map((name) => (
          <CarouselItem key={name} className="sm:basis-1/2 lg:basis-1/3">
            <Image
              src={`${imagePath}/${name}`}
              alt={name}
              width={350}
              height={700}
              loader={supabaseLoader}
              className="rounded-md border-2"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext></CarouselNext>
    </Carousel>
  );
}
