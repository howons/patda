"use client";

import {
  Description,
  Field,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@headlessui/react";
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
  return (
    <RadioGroup className={` ${className}`} {...props}>
      {items.map(({ id, name, description }) => (
        <Field key={id}>
          <Radio value={id} />
          <div>
            <Label size="md">{name}</Label>
            <Description>{description}</Description>
          </div>
        </Field>
      ))}
    </RadioGroup>
  );
}

export default RadioTabs;
