"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";

import { BANNER_IMAGES } from "#lib/constants/banner.js";
import ImageContainer from "#ui/Banner/ImageContainer.jsx";
import SliderButton from "#ui/Banner/SliderButton.jsx";

function Banner({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  const [curImage, setCurImage] = useState(0);
  const [isReturning, setIsReturning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurImage((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(intervalRef.current!);
  }, []);

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

  const imageTransitionStyle = isReturning
    ? ""
    : "transition-transform duration-500";

  const imageTranslateStyle = [
    "",
    "-translate-x-[100vw]",
    "-translate-x-[200vw]",
    "-translate-x-[300vw]",
  ];

  return (
    <div
      className={`relative flex h-64 w-screen overflow-hidden ${className}`}
      {...props}>
      <ImageContainer
        className={`${imageTransitionStyle} ${imageTranslateStyle[curImage]}`}
      />
      <ImageContainer
        className={`${imageTransitionStyle} ${imageTranslateStyle[curImage]}`}
      />
      <SliderButton
        curImage={curImage}
        setCurImage={setCurImage}
        intervalRef={intervalRef}
        className="absolute bottom-0 left-0 w-full"
      />
    </div>
  );
}

export default Banner;
