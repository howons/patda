import { IoCameraSharp } from "@react-icons/all-files/io5/IoCameraSharp";

import { MAX_IMAGE_COUNT } from "#lib/constants/image.js";
import type { FormColor } from "#lib/types/property.js";
import Button, { type ButtonProps } from "#ui/Button/Button.jsx";

interface UploadButtonProps extends ButtonProps {
  imageCount: number;
}

export default function UploadButton({
  imageCount,
  color,
  className = "",
  ...props
}: UploadButtonProps) {
  const defaultStyle = "flex cs:size-28 flex-col items-center justify-evenly";

  const svgColorStyles: { [key in FormColor]: string } = {
    orange: "fill-orange-400",
    red: "fill-red-400",
    green: "fill-green-400",
    zinc: "fill-zinc-400",
    lime: "fill-lime-400",
    rose: "fill-rose-400",
  };

  return (
    <Button
      color={color}
      type="button"
      className={`${defaultStyle} ${className}`}
      {...props}>
      <IoCameraSharp className={`size-1/3 ${svgColorStyles[color]}`} />
      <div className="flex font-light text-neutral-700">
        <p>{imageCount}</p> / <p>{MAX_IMAGE_COUNT}</p>
      </div>
    </Button>
  );
}
