import { Disclosure, DisclosureButton } from "@headlessui/react";
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

import { cn } from "#utils/utils.js";

const tempSaveListVariants = cva(
  "flex h-9 min-w-24 items-center justify-between rounded px-2 py-1 transition-colors",
  {
    variants: {
      colorStyle: {
        orange: "bg-orange-50",
        red: "bg-red-50",
        green: "bg-green-50",
        zinc: "bg-zinc-50",
        lime: "bg-lime-50",
        rose: "bg-rose-50",
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
