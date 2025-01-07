"use client";

import { type ComponentProps, useEffect, useRef, useState } from "react";

import { BANNER_IMAGES } from "#lib/constants/banner.js";
import ImageContainer from "#ui/ImageSlider/ImageContainer.jsx";
import SliderButton from "#ui/ImageSlider/SliderButton.jsx";
import { cn } from "#utils/utils.js";

interface ImageSliderProps extends ComponentProps<"div"> {
  images: { id: string; url: string }[];
  width: number;
  height: number;
  auto?: boolean;
  delay?: number;
}

export default function ImageSlider({
  images,
  width,
  height,
  auto,
  delay = 3000,
  className,
  ...props
}: ImageSliderProps) {
  const [curImage, setCurImage] = useState(0);
  const [isReturning, setIsReturning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!auto) return;

    intervalRef.current = setInterval(() => {
      setCurImage((prev) => prev + 1);
    }, delay);

    return () => clearInterval(intervalRef.current!);
  }, [auto, delay]);

  useEffect(() => {
    if (curImage >= BANNER_IMAGES.length) {
      setTimeout(() => {
        setIsReturning(true);
        setCurImage(0);

        setTimeout(() => {
          setIsReturning(false);
        }, 100);
      }, 500);
    }
  }, [curImage]);

  const imageTransitionStyle =
    isReturning || "transition-transform duration-500";

  const imageTranslateStyle = [
    "",
    "-translate-x-[100vw]",
    "-translate-x-[200vw]",
    "-translate-x-[300vw]",
  ];

  return (
    <div
      className={cn("relative flex h-64 w-screen overflow-hidden", className)}
      {...props}>
      <ImageContainer
        images={images}
        width={width}
        height={height}
        className={cn(imageTransitionStyle, imageTranslateStyle[curImage])}
      />
      <ImageContainer
        images={images}
        width={width}
        height={height}
        className={cn(imageTransitionStyle, imageTranslateStyle[curImage])}
      />
      <SliderButton
        imageLength={images.length}
        curImage={curImage}
        setCurImage={setCurImage}
        intervalRef={intervalRef}
        className="absolute bottom-0 left-0 w-full"
      />
    </div>
  );
}
