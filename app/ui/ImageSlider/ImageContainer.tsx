import Image from "next/image";
import { type ComponentProps } from "react";

import { cn } from "#utils/utils.js";

interface ImageContainerProps extends ComponentProps<"div"> {
  images: { id: string; url: string }[];
  width: number;
  height: number;
}

export default function ImageContainer({
  images,
  width,
  height,
  className,
  ...props
}: ImageContainerProps) {
  return (
    <div className={cn("flex shrink-0", className)} {...props}>
      {images.map(({ id, url }) => (
        <Image
          key={id}
          src={url}
          alt="banner"
          width={width}
          height={height}
          className="h-full w-screen bg-stone-200 object-contain"
        />
      ))}
    </div>
  );
}
