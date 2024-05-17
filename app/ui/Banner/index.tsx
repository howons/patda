"use client";

import { BANNER_IMAGES } from "@lib/constants/ banner";
import ImageContainer from "@ui/Banner/ImageContainer";
import { useEffect, useState } from "react";

function Banner() {
  const [curImage, setCurImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurImage((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (curImage >= BANNER_IMAGES.length) {
      setTimeout(() => {
        setCurImage(0);
      }, 500);
    }
  }, [curImage]);

  const imagesTransitionStyle = [
    "",
    "transition-transform duration-500 -translate-x-[100vw]",
    "transition-transform duration-500 -translate-x-[200vw]",
    "transition-transform duration-500 -translate-x-[300vw]",
  ];

  return (
    <div className="flex h-64 w-full overflow-hidden">
      <ImageContainer className={imagesTransitionStyle[curImage]} />
      <ImageContainer className={imagesTransitionStyle[curImage]} />
    </div>
  );
}

export default Banner;
