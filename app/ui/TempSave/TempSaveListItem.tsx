"use client";

import { FiAlertCircle } from "@react-icons/all-files/fi/FiAlertCircle";
import { cva } from "class-variance-authority";
import { type ComponentProps, type MouseEvent, useState } from "react";

import { PLATFORM_COLOR, PLATFORM_NAME } from "#lib/constants/platform.js";
import type {
  FormColor,
  Platform,
  TempSaveItemStatus,
} from "#lib/types/property.js";
import AuthorTag from "#ui/AuthorTag/AuthorTag.jsx";
import Dot from "#ui/Dot/Dot.jsx";
import Label from "#ui/formItems/Label.jsx";
import Spotlight from "#ui/TempSave/Spotlight.jsx";
import { cn } from "#utils/utils.js";

const tempSaveListItemVariants = cva(
  "relative flex min-h-11 cursor-pointer items-center justify-between overflow-hidden rounded border-t px-3 py-2 shadow",
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
  updatedAt: Date;
  isActive: boolean;
  isTarget: boolean;
  category?: string | false;
  titleText?: string | false;
  colorStyle?: FormColor | null;
  handleItemClick: (
    itemStatus?: TempSaveItemStatus
  ) => (e: MouseEvent<HTMLElement>) => void;
}

export default function TempSaveListItem({
  updatedAt,
  isActive,
  isTarget,
  category,
  titleText,
  colorStyle,
  handleItemClick,
  className,
  ...props
}: TempSaveListItemProps) {
  const [itemStatus, setItemStatus] = useState<TempSaveItemStatus>("select");

  const handleItemClickWithStatus = (itemStatus?: TempSaveItemStatus) => {
    const statusEvent = () => setItemStatus("select");
    const itemEvent = handleItemClick(itemStatus);

    return (e: MouseEvent<HTMLElement>) => {
      statusEvent();
      itemEvent(e);
    };
  };

  const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setItemStatus("delete");
    handleItemClick()(e);
  };

  return (
    <li
      className={cn(tempSaveListItemVariants({ colorStyle, className }))}
      onClick={handleItemClickWithStatus()}
      {...props}>
      <div className="flex items-center gap-2">
        <Label colorStyle={colorStyle} size="md">
          {category || ""}
        </Label>
        <Dot
          colorStyle={colorStyle}
          size={isActive ? "md" : "sm"}
          className={cn("transition-all", isActive && "border-4")}
        />
        <h1 className="min-w-0 max-w-[50%] truncate">{titleText || ""}</h1>
      </div>
      <div
        className={cn(
          "transition-opacity duration-500 flex items-center gap-2",
          isTarget && "opacity-0"
        )}>
        <AuthorTag date={updatedAt} summary />
        <button
          type="button"
          className="flex size-5 origin-center rotate-45 items-center justify-center text-xl text-neutral-400 hover:text-neutral-700"
          onClick={handleDeleteClick}>
          +
        </button>
      </div>
      <p
        className={cn(
          "flex items-center text-sm text-red-900 absolute right-3 top-2.5 transition-transform duration-500 translate-x-56",
          isTarget && "translate-x-0"
        )}>
        {itemStatus === "select"
          ? "임시 저장된 내용으로 변경?"
          : "임시 저장된 내용 삭제?"}
        <FiAlertCircle
          className={cn(
            "ml-2 size-5",
            itemStatus === "select" ? "stroke-orange-500" : "stroke-red-500"
          )}
        />
      </p>
      <Spotlight
        isTarget={isTarget}
        itemStatus={itemStatus}
        handleItemClick={handleItemClickWithStatus}
      />
    </li>
  );
}
