"use client";

import { FiMoreHorizontal } from "@react-icons/all-files/fi/FiMoreHorizontal";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

import type { Platform } from "#lib/types/property.js";
import DaangnLogo from "#public/당근.svg";
import BunjangLogo from "#public/번개장터.svg";
import JoongnaLogo from "#public/중고나라.svg";
import { cn } from "#utils/utils.js";

interface ThumbnailProps extends ImageProps {
  platform: Platform;
}

export default function Thumbnail({
  platform,
  src,
  alt,
  className,
  ...props
}: ThumbnailProps) {
  const [isError, setIsError] = useState(false);

  const defaultStyle = "border border-zinc-100 shadow-inner object-contain";

  return !isError && src ? (
    <Image
      src={src}
      alt={alt ?? "썸네일"}
      onError={(e) => {
        setIsError(true);
      }}
      className={cn(defaultStyle, className)}
      {...props}
    />
  ) : platform === "daangn" ? (
    <DaangnLogo className={cn(defaultStyle, className)} />
  ) : platform === "bunjang" ? (
    <BunjangLogo className={cn(defaultStyle, className)} />
  ) : platform === "joongna" ? (
    <JoongnaLogo className={cn(defaultStyle, className)} />
  ) : (
    <FiMoreHorizontal className={cn(defaultStyle, className)} />
  );
}
