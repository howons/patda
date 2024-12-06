import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";

import { PLATFORM_COLOR, PLATFORM_NAME } from "#lib/constants/platform.js";
import type { Platform } from "#lib/types/property.js";
import AuthorTag from "#ui/AuthorTag/AuthorTag.jsx";
import Dot from "#ui/Dot/Dot.jsx";
import Label from "#ui/formItems/Label.jsx";
import { cn } from "#utils/utils.js";

const tempSaveListItemVariants = cva(
  "flex cursor-pointer items-center justify-between rounded border-t px-3 py-2 shadow",
  {
    variants: {
      colorStyle: {
        orange: "border-orange-100 bg-orange-50 hover:bg-orange-100",
        red: "border-red-100 bg-red-50 hover:bg-red-100",
        green: "border-green-100 bg-green-50 hover:bg-green-100",
        zinc: "border-zinc-100 bg-zinc-50 hover:bg-zinc-100",
        lime: "border-lime-100 bg-lime-50 hover:bg-lime-100",
        rose: "border-rose-100 bg-rose-50 hover:bg-rose-100",
      },
    },
    defaultVariants: {
      colorStyle: "orange",
    },
  }
);

interface TempSaveListItemProps extends ComponentProps<"li"> {
  platform: Platform;
  targetNickname: string;
  updatedAt: Date;
}

export default function TempSaveListItem({
  platform,
  targetNickname,
  updatedAt,
  className,
  ...props
}: TempSaveListItemProps) {
  const colorStyle = PLATFORM_COLOR[platform];
  console.log(updatedAt);
  return (
    <li
      className={cn(tempSaveListItemVariants({ colorStyle, className }))}
      {...props}>
      <div className="flex items-center gap-2">
        <Label colorStyle={colorStyle} size="md">
          {PLATFORM_NAME[platform]}
        </Label>
        <Dot />
        {targetNickname}
      </div>
      <AuthorTag date={updatedAt} summary />
    </li>
  );
}
