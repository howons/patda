"use client";

import Image, { type ImageProps } from "next/image";

import { supabaseLoader } from "#lib/utils/supabase/imagePath.js";

interface ImageItemProps extends Partial<ImageProps> {
  imagePath: string;
  name: string;
}

export default function ImageItem({
  imagePath,
  name,
  width,
  height,
  src,
  alt,
  ...props
}: ImageItemProps) {
  return (
    <Image
      src={`${imagePath}/${name}`}
      alt={name}
      width={width}
      height={height}
      loader={supabaseLoader}
      {...props}
    />
  );
}
