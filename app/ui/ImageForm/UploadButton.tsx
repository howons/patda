import { IoCameraSharp } from "@react-icons/all-files/io5/IoCameraSharp";
import { cva, type VariantProps } from "class-variance-authority";

import { MAX_IMAGE_COUNT } from "#lib/constants/image.js";
import Button, { type ButtonProps } from "#ui/Button/Button.jsx";
import { cn } from "#utils/utils.js";

const uploadButtonSvgVariants = cva("size-1/3", {
  variants: {
    colorStyle: {
      orange: "fill-orange-400",
      red: "fill-red-400",
      green: "fill-green-400",
      zinc: "fill-zinc-400",
      lime: "fill-lime-400",
      rose: "fill-rose-400",
    },
  },
  defaultVariants: {
    colorStyle: "orange",
  },
});

interface UploadButtonProps
  extends ButtonProps,
    VariantProps<typeof uploadButtonSvgVariants> {
  imageCount: number;
}

export default function UploadButton({
  imageCount,
  colorStyle,
  className,
  ...props
}: UploadButtonProps) {
  const defaultStyle = "flex cs:size-28 flex-col items-center justify-evenly";

  return (
    <Button
      colorStyle={colorStyle}
      type="button"
      className={cn(defaultStyle, className)}
      {...props}>
      <IoCameraSharp className={cn(uploadButtonSvgVariants({ colorStyle }))} />
      <div className="flex font-light text-neutral-700">
        <p>{imageCount}</p> / <p>{MAX_IMAGE_COUNT}</p>
      </div>
    </Button>
  );
}
