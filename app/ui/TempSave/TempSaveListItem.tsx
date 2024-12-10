"use client";

import { FiAlertCircle } from "@react-icons/all-files/fi/FiAlertCircle";
import { cva } from "class-variance-authority";
import type { ComponentProps, MouseEvent } from "react";

import { PLATFORM_COLOR, PLATFORM_NAME } from "#lib/constants/platform.js";
import type { Platform } from "#lib/types/property.js";
import AuthorTag from "#ui/AuthorTag/AuthorTag.jsx";
import Dot from "#ui/Dot/Dot.jsx";
import Label from "#ui/formItems/Label.jsx";
import { cn } from "#utils/utils.js";

const tempSaveListItemVariants = cva(
  "relative flex cursor-pointer items-center justify-between overflow-hidden rounded border-t px-3 py-2 shadow",
  {
    variants: {
      colorStyle: {
        orange:
          "border-orange-100 bg-orange-50 hover:bg-orange-100 has-[.ambient-shadow:hover]:hover:bg-orange-50",
        red: "border-red-100 bg-red-50 hover:bg-red-100 has-[.ambient-shadow:hover]:hover:bg-red-50",
        green:
          "border-green-100 bg-green-50 hover:bg-green-100 has-[.ambient-shadow:hover]:hover:bg-green-50",
        zinc: "border-zinc-100 bg-zinc-50 hover:bg-zinc-100 has-[.ambient-shadow:hover]:hover:bg-zinc-50",
        lime: "border-lime-100 bg-lime-50 hover:bg-lime-100 has-[.ambient-shadow:hover]:hover:bg-lime-50",
        rose: "border-rose-100 bg-rose-50 hover:bg-rose-100 has-[.ambient-shadow:hover]:hover:bg-rose-50",
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
  isActive?: boolean;
  isTarget?: boolean;
  handleItemClick: (
    itemStatus?: "select" | "delete"
  ) => (e: MouseEvent<HTMLElement>) => void;
}

export default function TempSaveListItem({
  platform,
  targetNickname,
  updatedAt,
  isActive,
  isTarget,
  handleItemClick,
  className,
  ...props
}: TempSaveListItemProps) {
  const colorStyle = PLATFORM_COLOR[platform];

  return (
    <li
      className={cn(tempSaveListItemVariants({ colorStyle, className }))}
      onClick={handleItemClick()}
      {...props}>
      <div className="flex items-center gap-2">
        <Label colorStyle={colorStyle} size="md">
          {PLATFORM_NAME[platform]}
        </Label>
        <Dot
          colorStyle={colorStyle}
          size={isActive ? "md" : "sm"}
          className={cn("transition-all", isActive && "border-4")}
        />
        {targetNickname}
      </div>
      <AuthorTag
        date={updatedAt}
        summary
        className={cn(
          "transition-opacity duration-500",
          isTarget && "opacity-0"
        )}
      />
      <p
        className={cn(
          "flex items-center text-sm text-red-900 absolute right-3 top-2.5 transition-transform duration-500 translate-x-56",
          isTarget && "translate-x-0"
        )}>
        임시 저장된 내용으로 변경?
        <FiAlertCircle className="ml-2 size-5 stroke-orange-500" />
      </p>
      <div
        className={cn(
          "absolute right-[-27.5rem] top-[-33.75rem] size-[70rem] rounded-full border border-neutral-400/10 transition-all duration-500",
          isTarget &&
            "border-[447px] border-neutral-400/50 hover:border-neutral-400/70",
          "ambient-shadow"
        )}
        onClick={handleItemClick()}
      />
      <div
        className="absolute right-2 top-[-5.75rem] size-56 rounded-full"
        onClick={handleItemClick("select")}
      />
    </li>
  );
}
