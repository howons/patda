import { Disclosure, DisclosureButton } from "@headlessui/react";
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

import { cn } from "#utils/utils.js";

const tempSaveListVariants = cva(
  "flex h-9 min-w-24 items-center justify-between rounded border px-2 py-1 transition-colors",
  {
    variants: {
      colorStyle: {
        orange: "border-orange-500",
        red: "border-red-500",
        green: "border-green-500",
        zinc: "border-zinc-500",
        lime: "border-lime-500",
        rose: "border-rose-500",
      },
    },
    defaultVariants: {
      colorStyle: "orange",
    },
  }
);

interface TempSaveListProps
  extends ComponentPropsWithRef<"button">,
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
    <Disclosure>
      <DisclosureButton
        className={cn(tempSaveListVariants({ colorStyle, className }))}
        {...props}>
        임시 저장 목록
        <FaChevronDown className="size-3 fill-neutral-400" />
      </DisclosureButton>
    </Disclosure>
  );
}
