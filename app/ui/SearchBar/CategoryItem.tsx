import { FiMoreHorizontal } from "@react-icons/all-files/fi/FiMoreHorizontal";
import type { ComponentProps } from "react";

import { PLATFORM_NAME } from "#lib/constants/platform.js";
import type { Platform } from "#lib/types/property.js";
import DaangnLogo from "#public/당근.svg";
import BunjangLogo from "#public/번개장터.svg";
import JoongnaLogo from "#public/중고나라.svg";
import { cn } from "#utils/utils.js";

const svgDefaultStyle = "rotate-45 w-3/4 h-3/4 opacity-75";

const platformSvg: { [key in Platform]: React.JSX.Element } = {
  daangn: <DaangnLogo className={svgDefaultStyle} />,
  bunjang: <BunjangLogo className={svgDefaultStyle} />,
  joongna: <JoongnaLogo className={svgDefaultStyle} />,
  etc: <FiMoreHorizontal className={svgDefaultStyle} />,
};

interface CategoryItemProps extends ComponentProps<"div"> {
  platform: Platform;
  isActive?: Boolean;
}

export default function CategoryItem({
  platform,
  isActive,
  className,
  ...props
}: CategoryItemProps) {
  const platformStyle: { [key in Platform]: string } = {
    daangn: "bg-orange-100 text-orange-700",
    bunjang: "bg-red-100 text-red-700",
    joongna: "bg-green-100 text-green-700",
    etc: "bg-zinc-100 text-zinc-700",
  };

  const defaultStyle = "size-20 flex items-center justify-center";

  const nameDefaultStyle =
    "absolute rotate-45 p-1 font-bold transition-opacity duration-300 min-w-14 text-center";

  const nameOpacityStyle = isActive ? "opacity-75" : "opacity-0";

  return (
    <div
      className={cn(defaultStyle, platformStyle[platform], className)}
      {...props}>
      {platformSvg[platform]}
      <div
        className={cn(
          nameDefaultStyle,
          nameOpacityStyle,
          platformStyle[platform]
        )}>
        {PLATFORM_NAME[platform]}
      </div>
    </div>
  );
}
