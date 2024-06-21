import Image from "next/image";
import { HTMLAttributes } from "react";

import { BANNER_IMAGES } from "#lib/constants/banner";

function ImageContainer({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex shrink-0 ${className}`} {...props}>
      {BANNER_IMAGES.map((image) => (
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

export default ImageContainer;
