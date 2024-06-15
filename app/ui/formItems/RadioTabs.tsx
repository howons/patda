"use client";

import {
  Description,
  Field,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@headlessui/react";
import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { Platform } from "@lib/types/property";
import Label from "@ui/formItems/Label";
import React from "react";

interface RadioTabsProps<ItemType extends string>
  extends RadioGroupProps<"div", ItemType> {
  items: { id: ItemType; name: string; description: string }[];
}

function RadioTabs<ItemType extends string>({
  items,
  className = "",
  ...props
}: RadioTabsProps<ItemType>) {
  const platform = usePlatformStore((store) => store.platform);

  const defaultStyle =
    "grid grid-cols-autofit-48 gap-3 box-border cursor-pointer";
  const itemDefaultStyle = "rounded-md border";
  const labelDefaultStyle =
    "rounded-tl-md rounded-br-md py-1 px-2 border inline-block cursor-pointer";

  const platformStyles: { [key in Platform]: string } = {
    daangn: "border-orange-400",
    bunjang: "border-red-400",
    joongna: "border-green-400",
    etc: "border-zinc-400",
  };

  const platformCheckedStyles: (checked: boolean) => {
    [key in Platform]: string;
  } = (checked) => ({
    daangn: checked
      ? "bg-orange-300 hover:bg-orange-200"
      : "bg-orange-50 hover:bg-orange-100",
    bunjang: checked
      ? "bg-red-300 hover:bg-red-200"
      : "bg-red-50 hover:bg-red-100",
    joongna: checked
      ? "bg-green-300 hover:bg-green-200"
      : "bg-green-50 hover:bg-green-100",
    etc: checked
      ? "bg-zinc-300 hover:bg-zinc-200"
      : "bg-zinc-50 hover:bg-zinc-100",
  });

  const platformLabelStyles: { [key in Platform]: string } = {
    daangn: "bg-orange-100 border-orange-400",
    bunjang: "bg-red-100 border-red-400",
    joongna: "bg-green-100 border-green-400",
    etc: "bg-zinc-100 border-zinc-400",
  };

  return (
    <RadioGroup className={`${defaultStyle} ${className}`} {...props}>
      {items.map(({ id, name, description }) => (
        <Field key={id}>
          <Radio value={id}>
            {({ checked }) => (
              <div
                className={`${itemDefaultStyle} ${platformStyles[platform]} ${platformCheckedStyles(checked)[platform]}`}>
                <Label
                  size="md"
                  className={`${labelDefaultStyle} ${platformLabelStyles[platform]}`}>
                  {name}
                </Label>
                <Description className={`mx-3 my-2 text-sm text-neutral-700`}>
                  {description}
                </Description>
              </div>
            )}
          </Radio>
        </Field>
      ))}
    </RadioGroup>
  );
}

export default RadioTabs;
