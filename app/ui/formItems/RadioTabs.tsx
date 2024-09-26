import {
  Description,
  Field,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@headlessui/react";
import React from "react";

import type { FormColor } from "#lib/types/property.js";
import Label from "#ui/formItems/Label.jsx";

interface RadioTabsProps<ItemType extends string>
  extends RadioGroupProps<"div", ItemType> {
  items: { id: ItemType; name: string; description: string }[];
  color: FormColor;
}

function RadioTabs<ItemType extends string>({
  items,
  color,
  className = "",
  ...props
}: RadioTabsProps<ItemType>) {
  const defaultStyle =
    "grid grid-cols-autofit-48 gap-3 box-border cursor-pointer";
  const itemDefaultStyle = "rounded-md border";
  const labelDefaultStyle =
    "rounded-tl-md rounded-br-md py-1 px-2 border inline-block cursor-pointer";

  const colorStyles: { [key in FormColor]: string } = {
    orange: "border-orange-400",
    red: "border-red-400",
    green: "border-green-400",
    zinc: "border-zinc-400",
    rose: "border-rose-400",
    lime: "border-lime-400",
  };

  const colorCheckedStyles: (checked: boolean) => {
    [key in FormColor]: string;
  } = (checked) => ({
    orange: checked
      ? "bg-orange-300 hover:bg-orange-200"
      : "bg-orange-50 hover:bg-orange-100",
    red: checked ? "bg-red-300 hover:bg-red-200" : "bg-red-50 hover:bg-red-100",
    green: checked
      ? "bg-green-300 hover:bg-green-200"
      : "bg-green-50 hover:bg-green-100",
    zinc: checked
      ? "bg-zinc-300 hover:bg-zinc-200"
      : "bg-zinc-50 hover:bg-zinc-100",
    rose: checked
      ? "bg-rose-300 hover:bg-rose-200"
      : "bg-rose-50 hover:bg-rose-100",
    lime: checked
      ? "bg-lime-300 hover:bg-lime-200"
      : "bg-lime-50 hover:bg-lime-100",
  });

  const colorLabelStyles: { [key in FormColor]: string } = {
    orange: "bg-orange-100 border-orange-400",
    red: "bg-red-100 border-red-400",
    green: "bg-green-100 border-green-400",
    zinc: "bg-zinc-100 border-zinc-400",
    rose: "bg-rose-100 border-rose-400",
    lime: "bg-lime-100 border-lime-400",
  };

  return (
    <RadioGroup className={`${defaultStyle} ${className}`} {...props}>
      {items.map(({ id, name, description }) => (
        <Field key={id}>
          <Radio value={id}>
            {({ checked }) => (
              <div
                className={`${itemDefaultStyle} ${colorStyles[color]} ${colorCheckedStyles(checked)[color]}`}>
                <Label
                  color={color}
                  size="md"
                  className={`${labelDefaultStyle} ${colorLabelStyles[color]}`}>
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
