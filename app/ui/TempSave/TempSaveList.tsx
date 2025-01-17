"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentPropsWithRef, type MouseEvent, useState } from "react";

import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import type { Platform, TempSaveItemStatus } from "#lib/types/property.js";
import Label from "#ui/formItems/Label.jsx";
import TempSaveListItem from "#ui/TempSave/TempSaveListItem.jsx";
import { cn } from "#utils/utils.js";

const tempSaveListVariants = cva(
  "group flex size-full min-w-24 items-center justify-between rounded px-2 py-1 shadow data-[open]:border-l-4",
  {
    variants: {
      colorStyle: {
        orange: "border-orange-400 bg-orange-50 hover:bg-orange-100",
        red: "border-red-400 bg-red-50 hover:bg-red-100",
        green: "border-green-400 bg-green-50 hover:bg-green-100",
        zinc: "border-zinc-400 bg-zinc-50 hover:bg-zinc-100",
        lime: "border-lime-400 bg-lime-50 hover:bg-lime-100",
        rose: "border-rose-400 bg-rose-50 hover:bg-rose-100",
      },
    },
    defaultVariants: {
      colorStyle: "orange",
    },
  }
);

interface TempSaveListProps
  extends ComponentPropsWithRef<"div">,
    VariantProps<typeof tempSaveListVariants> {
  tempSaveKey: string | undefined;
  tempSaveList: any[];
  categoryKey?: string;
  categoryValues?: { [key: string]: string };
  titleKey?: string;
  selectTempSave: (key: string) => void;
  deleteTempSave: (key: string) => void;
}

export default function TempSaveList({
  tempSaveKey,
  tempSaveList,
  categoryKey,
  categoryValues,
  titleKey,
  selectTempSave,
  deleteTempSave,
  colorStyle,
  className,
  ...props
}: TempSaveListProps) {
  const [targetItemKey, setTargetItemKey] = useState<string | null>(null);

  const handleButtonClick = () => {
    setTargetItemKey(null);
  };

  const handleItemClick =
    (key: string, itemStatus?: TempSaveItemStatus) =>
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      if (targetItemKey !== key) {
        setTargetItemKey(key);
        return;
      }

      if (itemStatus === "select") {
        selectTempSave(key);
      } else if (itemStatus === "delete") {
        deleteTempSave(key);
      }

      setTargetItemKey(null);
    };

  return (
    <Popover as="div" className={className} {...props}>
      <PopoverButton
        className={cn(tempSaveListVariants({ colorStyle }))}
        onClick={handleButtonClick}>
        <Label
          colorStyle={colorStyle}
          size="md"
          className="mx-2 group-data-[open]:mx-1">
          임시 저장 목록
        </Label>
        <FaChevronDown className="size-3 fill-neutral-400 transition-transform group-data-[open]:rotate-180" />
      </PopoverButton>
      <PopoverPanel
        as="ul"
        transition
        className="origin-top transition ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
        {tempSaveList.map(({ key, data }) => {
          const category =
            categoryKey &&
            (categoryValues
              ? categoryValues[data[categoryKey]]
              : data[categoryKey]);
          const titleText = titleKey && data[titleKey];
          const itemColorStyle = data.platform
            ? PLATFORM_COLOR[data.platform as Platform]
            : colorStyle;

          return (
            <TempSaveListItem
              key={key}
              category={category}
              titleText={titleText}
              updatedAt={data.updatedAt}
              isActive={tempSaveKey === key}
              isTarget={targetItemKey == key}
              colorStyle={itemColorStyle}
              handleItemClick={handleItemClick.bind(null, key)}
            />
          );
        })}
      </PopoverPanel>
    </Popover>
  );
}
