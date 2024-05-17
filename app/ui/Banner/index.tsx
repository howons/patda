"use client";

import Image from "next/image";
import { HTMLAttributes, useEffect, useState } from "react";

const tempImages = ["/당근.svg", "/번개장터.svg", "/중고나라.svg"];

function Banner() {
  const [curImage, setCurImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurImage((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (curImage >= tempImages.length) {
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

function ImageContainer({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex shrink-0 ${className}`} {...props}>
      {tempImages.map((image) => (
        <Image
          key={image}
          src={image}
          alt="banner"
          width={360}
          height={256}
          className="h-full w-screen bg-stone-300 object-contain"
        />
      ))}
    </div>
  );
}

export default Banner;
