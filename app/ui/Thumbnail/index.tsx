"use client";

import { Platform } from "@lib/types/property";
import { FiMoreHorizontal } from "@react-icons/all-files/fi/FiMoreHorizontal";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

import DaangnLogo from "@/public/당근.svg";
import BunjangLogo from "@/public/번개장터.svg";
import JoongnaLogo from "@/public/중고나라.svg";

interface ThumbnailProps extends ImageProps {
  platform: Platform;
}

function Thumbnail({
  platform,
  src,
  alt,
  width,
  height,
  className,
  ...props
}: ThumbnailProps) {
  const [isError, setIsError] = useState(false);

  const defaultStyle = "border border-zinc-100 shadow-inner";

  return !isError && src ? (
    <Image
      src={src}
      alt={alt ?? "썸네일"}
      onError={(e) => {
        setIsError(true);
      }}
      className={`${defaultStyle} ${className}`}
      {...props}
    />
  ) : platform === "daangn" ? (
    <DaangnLogo
      width={width}
      height={height}
      className={`${defaultStyle} ${className}`}
    />
  ) : platform === "bunjang" ? (
    <BunjangLogo
      width={width}
      height={height}
      className={`${defaultStyle} ${className}`}
    />
  ) : platform === "joongna" ? (
    <JoongnaLogo
      width={width}
      height={height}
      className={`${defaultStyle} ${className}`}
    />
  ) : (
    <FiMoreHorizontal size={width} className={`${defaultStyle} ${className}`} />
  );
}

export default Thumbnail;
