"use client";

import { BANNER_IMAGES } from "@lib/constants/ banner";
import { Dispatch, HTMLAttributes, MouseEvent, SetStateAction } from "react";

interface SliderButtonProps extends HTMLAttributes<HTMLDivElement> {
  curImage: number;
  setCurImage: Dispatch<SetStateAction<number>>;
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
}

function SliderButton({
  curImage,
  setCurImage,
  intervalRef,
  className,
  ...props
}: SliderButtonProps) {
  const handleClick = (idx: number) => (e: MouseEvent<HTMLButtonElement>) => {
    setCurImage(idx);

    clearInterval(intervalRef.current!);
    intervalRef.current = setInterval(() => {
      setCurImage((prev) => prev + 1);
    }, 3000);
  };

  const buttonDefaultStyle =
    "w-3 h-3 rounded-full bg-stone-400 hover:bg-stone-300 transition-all duration-300 origin-center";
  const buttonActiveStyle = (idx: number) =>
    idx === curImage % BANNER_IMAGES.length ? "cs:bg-stone-200 scale-150" : "";

  return (
    <div className={`flex justify-center gap-3 p-4 ${className}`} {...props}>
      {BANNER_IMAGES.map((image, idx) => (
        <button
          key={image}
          className={`${buttonDefaultStyle} ${buttonActiveStyle(idx)}`}
          onClick={handleClick(idx)}
        />
      ))}
    </div>
  );
}

export default SliderButton;
