import Image from "next/image";
import { type ComponentProps } from "react";

interface ImageContainerProps extends ComponentProps<"div"> {
  images: { id: string; url: string }[];
  width: number;
  height: number;
}

function ImageContainer({
  images,
  width,
  height,
  className = "",
  ...props
}: ImageContainerProps) {
  return (
    <div className={`flex shrink-0 ${className}`} {...props}>
      {images.map(({ id, url }) => (
        <Image
          key={id}
          src={url}
          alt="banner"
          width={width}
          height={height}
          className="h-full w-screen bg-stone-300 object-contain"
        />
      ))}
    </div>
  );
}

export default ImageContainer;
