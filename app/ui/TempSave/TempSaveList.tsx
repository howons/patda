import { Disclosure, DisclosureButton } from "@headlessui/react";
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

import Label from "#ui/formItems/Label.jsx";
import { cn } from "#utils/utils.js";

const tempSaveListVariants = cva(
  "group flex size-full min-w-24 items-center justify-between rounded px-2 py-1",
  {
    variants: {
      colorStyle: {
        orange: "bg-orange-50 hover:bg-orange-100",
        red: "bg-red-50 hover:bg-red-100",
        green: "bg-green-50 hover:bg-green-100",
        zinc: "bg-zinc-50 hover:bg-zinc-100",
        lime: "bg-lime-50 hover:bg-lime-100",
        rose: "bg-rose-50 hover:bg-rose-100",
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
        <Label colorStyle={colorStyle} size="md" className="ml-2">
          임시 저장 목록
        </Label>
        <FaChevronDown className="size-3 fill-neutral-400 transition-transform group-data-[open]:rotate-180" />
      </DisclosureButton>
    </Disclosure>
  );
}
