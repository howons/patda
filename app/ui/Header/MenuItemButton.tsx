import { MenuItem } from "@headlessui/react";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

function MenuItemButton({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <MenuItem>
      <button
        className={`flex h-8 w-full items-center rounded-lg p-6 data-[focus]:bg-gray-400/30 ${className}`}
        {...props}>
        {children}
      </button>
    </MenuItem>
  );
}

export default MenuItemButton;
