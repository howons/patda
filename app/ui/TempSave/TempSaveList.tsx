import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

import Label from "#ui/formItems/Label.jsx";
import TempSaveListItem from "#ui/TempSave/TempSaveListItem.jsx";
import { cn } from "#utils/utils.js";

const tempSaveListVariants = cva(
  "group flex size-full min-w-24 items-center justify-between rounded px-2 py-1 data-[open]:border-l-4",
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
  tempSaveIdx: number;
  tempSaveList: any[];
  selectTempSave: (idx: number) => void;
}

export default function TempSaveList({
  tempSaveIdx,
  tempSaveList,
  selectTempSave,
  colorStyle,
  className,
  ...props
}: TempSaveListProps) {
  return (
    <Disclosure as="div" className={className} {...props}>
      <DisclosureButton className={cn(tempSaveListVariants({ colorStyle }))}>
        <Label
          colorStyle={colorStyle}
          size="md"
          className="mx-2 group-data-[open]:mx-1">
          임시 저장 목록
        </Label>
        <FaChevronDown className="size-3 fill-neutral-400 transition-transform group-data-[open]:rotate-180" />
      </DisclosureButton>
      <DisclosurePanel
        as="ul"
        transition
        className="origin-top transition ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
        {tempSaveList.map(({ key, data }, idx) => (
          <TempSaveListItem
            key={key}
            platform={data.platform}
            targetNickname={data.targetNickname}
            updatedAt={data.updatedAt}
          />
        ))}
      </DisclosurePanel>
    </Disclosure>
  );
}
