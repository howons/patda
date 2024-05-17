"use client";

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverProps,
  Transition,
} from "@headlessui/react";
import { SearchStoreProvider } from "@lib/providers/SearchStoreProvider";
import SearchBar from "@ui/SearchBar";
import SearchList from "@ui/SearchList";
import { usePathname } from "next/navigation";
import { MouseEvent } from "react";

interface HeaderSearchProps extends PopoverProps {}

function HeaderSearch({ className = "", ...props }: HeaderSearchProps) {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const handlePopoverButtonClick =
    (open: boolean) => (e: MouseEvent<HTMLDivElement>) => {
      if (open) {
        e.preventDefault();
      }

      const eventTarget = e.target as HTMLElement;
      if (eventTarget.tagName === "INPUT") {
        eventTarget.focus();
      }
    };

  const popoverDefaultStyle =
    "flex h-14 flex-col items-center overflow-hidden transition-all duration-300";
  const popoverOpenStyle =
    "data-[open]:h-[70vh] data-[open]:pb-16 data-[open]:shadow-2xl data-[open]:rounded-b-2xl";

  return (
    <Popover
      className={`${popoverDefaultStyle} ${popoverOpenStyle} ${className}`}
      {...props}>
      {({ open }) => (
        <SearchStoreProvider>
          <PopoverButton
            as={SearchBar}
            role="button"
            aria-label="헤더 검색바"
            className={`shrink-0 transition-transform duration-300 focus:outline-none ${open ? "translate-y-7" : ""}`}
            onClick={handlePopoverButtonClick(open)}
          />
          <Transition
            enter="duration-200 ease-out"
            enterFrom="scale-75 opacity-0 traslate-y-0"
            enterTo="scale-100 opacity-100 translate-y-16"
            leave="duration-200 ease-out"
            leaveFrom="scale-100 opacity-100 translate-y-16"
            leaveTo="scale-75 opacity-0 translate-y-0">
            <PopoverPanel className="w-full min-w-64 max-w-[40rem] shrink grow origin-top overflow-scroll">
              <SearchList />
            </PopoverPanel>
          </Transition>
        </SearchStoreProvider>
      )}
    </Popover>
  );
}

export default HeaderSearch;
