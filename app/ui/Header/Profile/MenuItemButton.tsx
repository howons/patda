import { MenuItem } from "@headlessui/react";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { cn } from "#utils/utils.js";

interface MenuItemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function MenuItemButton({
  children,
  className,
  ...props
}: PropsWithChildren<MenuItemButtonProps>) {
  const defaultStyle =
    "flex h-8 w-full items-center rounded-lg p-6 data-[focus]:bg-gray-400/30";
  return (
    <MenuItem>
      <button className={cn(defaultStyle, className)} {...props}>
        {children}
      </button>
    </MenuItem>
  );
}

export default MenuItemButton;
