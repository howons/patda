import { IoCameraSharp } from "@react-icons/all-files/io5/IoCameraSharp";
import type { ComponentProps } from "react";

import { MAX_IMAGE_COUNT } from "#lib/constants/image.js";
import type { FormColor } from "#lib/types/property.js";

interface UploadButtonProps extends ComponentProps<"button"> {
  imageCount: number;
  color: FormColor;
}

export default function UploadButton({
  imageCount,
  color,
  className = "",
  ...props
}: UploadButtonProps) {
  const defaultStyle =
    "flex size-24 flex-col items-center justify-evenly border rounded-md";

  const colorStyles: { [key in FormColor]: string } = {
    orange: "border-orange-400 bg-orange-50 hover:bg-orange-100",
    red: "border-red-400 bg-red-50 hover:bg-red-100",
    green: "border-green-400 bg-green-50 hover:bg-green-100",
    zinc: "border-zinc-400 bg-zinc-50 hover:bg-zinc-100",
    lime: "border-lime-400 bg-lime-50 hover:bg-lime-100",
    rose: "border-rose-400 bg-rose-50 hover:bg-rose-100",
  };

  const svgColorStyles: { [key in FormColor]: string } = {
    orange: "fill-orange-400",
    red: "fill-red-400",
    green: "fill-green-400",
    zinc: "fill-zinc-400",
    lime: "fill-lime-400",
    rose: "fill-rose-400",
  };

  return (
    <button
      type="button"
      className={`${defaultStyle} ${colorStyles[color]} ${className}`}
      {...props}>
      <IoCameraSharp className={`size-1/3 ${svgColorStyles[color]}`} />
      <div className="flex">
        <p>{imageCount}</p> / <p>{MAX_IMAGE_COUNT}</p>
      </div>
    </button>
  );
}
