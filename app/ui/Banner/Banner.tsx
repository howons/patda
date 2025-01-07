import type { ComponentProps } from "react";

import { BANNER_IMAGES } from "#lib/constants/banner.js";
import ImageSlider from "#ui/ImageSlider/ImageSlider.jsx";

export default function Banner({ ...props }: ComponentProps<"div">) {
  return (
    <ImageSlider
      images={BANNER_IMAGES}
      width={360}
      height={256}
      auto
      delay={5000}
      {...props}
    />
  );
}
