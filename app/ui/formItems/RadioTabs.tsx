import {
  Description,
  Field,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import Label from "#ui/formItems/Label.jsx";
import { cn } from "#utils/utils.js";

const radioTabVariants = cva("rounded-md border", {
  variants: {
    colorStyle: {
      orange: [
        "border-orange-400 bg-orange-50 hover:bg-orange-100",
        "data-[checked]:bg-orange-300 data-[checked]:hover:bg-orange-200",
      ],
      red: [
        "border-red-400 bg-red-50 hover:bg-red-100",
        "data-[checked]:bg-red-300 data-[checked]:hover:bg-red-200",
      ],
      green: [
        "border-green-400 bg-green-50 hover:bg-green-100",
        "data-[checked]:bg-green-300 data-[checked]:hover:bg-green-200",
      ],
      zinc: [
        "border-zinc-400 bg-zinc-50 hover:bg-zinc-100",
        "data-[checked]:bg-zinc-300 data-[checked]:hover:bg-zinc-200",
      ],
      rose: [
        "border-rose-400 bg-rose-50 hover:bg-rose-100",
        "data-[checked]:bg-rose-300 data-[checked]:hover:bg-rose-200",
      ],
      lime: [
        "border-lime-400 bg-lime-50 hover:bg-lime-100",
        "data-[checked]:bg-lime-300 data-[checked]:hover:bg-lime-200",
      ],
    },
  },
  defaultVariants: {
    colorStyle: "orange",
  },
});

const radioLabelVariants = cva(
  "inline-block cursor-pointer rounded-br-md rounded-tl-md border px-2 py-1",
  {
    variants: {
      colorStyle: {
        orange: "border-orange-400 bg-orange-100",
        red: "border-red-400 bg-red-100",
        green: "border-green-400 bg-green-100",
        zinc: "border-zinc-400 bg-zinc-100",
        rose: "border-rose-400 bg-rose-100",
        lime: "border-lime-400 bg-lime-100",
      },
    },
    defaultVariants: {
      colorStyle: "orange",
    },
  }
);

interface RadioTabsProps<ItemType extends string>
  extends RadioGroupProps<"div", ItemType>,
    VariantProps<typeof radioTabVariants> {
  items: { id: ItemType; name: string; description: string }[];
}

export default function RadioTabs<ItemType extends string>({
  items,
  colorStyle,
  className,
  ...props
}: RadioTabsProps<ItemType>) {
  const defaultStyle =
    "grid grid-cols-autofit-48 gap-3 box-border cursor-pointer";

  return (
    <RadioGroup className={cn(defaultStyle, className)} {...props}>
      {items.map(({ id, name, description }) => (
        <Field key={id}>
          <Radio
            as="div"
            value={id}
            className={cn(radioTabVariants({ colorStyle }))}>
            <Label
              colorStyle={colorStyle}
              size="md"
              className={cn(radioLabelVariants({ colorStyle }))}>
              {name}
            </Label>
            <Description className={`mx-3 my-2 text-sm text-neutral-700`}>
              {description}
            </Description>
          </Radio>
        </Field>
      ))}
    </RadioGroup>
  );
}
