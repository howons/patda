"use client";

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
  PopoverProps,
} from "@headlessui/react";
import { usePathname } from "next/navigation";
import { MouseEvent } from "react";

import { SearchListProvider } from "#lib/providers/SearchListProvider.jsx";
import SearchBar from "#ui/SearchBar/SearchBar.jsx";
import SearchList from "#ui/SearchList/SearchList.jsx";
import { cn } from "#utils/utils.js";

interface HeaderSearchProps extends PopoverProps {}

function HeaderSearch({ className = "", ...props }: HeaderSearchProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  if (isHome) return null;

  const handlePopoverButtonClick = (e: MouseEvent<HTMLDivElement>) => {
    const isOpen = e.currentTarget.dataset.open !== undefined;
    if (isOpen) {
      e.preventDefault();
    }

    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT") {
      target.focus();
    }
  };

  const popoverDefaultStyle =
    "flex w-full h-14 flex-col items-center overflow-hidden transition-all duration-300";
  const popoverOpenStyle =
    "group-data-[open]:h-[70vh] group-data-[open]:pb-16 group-data-[open]:rounded-b-2xl group-data-[open]:max-sm:-translate-x-12 group-data-[open]:max-sm:w-full-plus-6rem";

  return (
    <Popover className={cn("group", className)} {...props}>
      <SearchListProvider>
        <div className={cn(popoverDefaultStyle, popoverOpenStyle)}>
          <PopoverBackdrop className="fixed inset-0 bg-black/15 transition-opacity duration-300 data-[close]:opacity-0" />
          <PopoverButton
            as={SearchBar}
            role="button"
            aria-label="헤더 검색바"
            className="shrink-0 transition-transform duration-300 focus:outline-none data-[open]:translate-y-7"
            onClick={handlePopoverButtonClick}
          />
          <PopoverPanel
            className={cn(
              "flex w-full shrink grow origin-top justify-center overflow-y-scroll bg-white shadow-lg transition duration-300 ease-out",
              "data-[close]:scale-75 data-[close]:opacity-0 data-[open]:translate-y-16"
            )}>
            <SearchList className="min-w-64 max-w-[40rem]" />
          </PopoverPanel>
        </div>
      </SearchListProvider>
    </Popover>
  );
}

export default HeaderSearch;
