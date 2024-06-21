"use client";

import {
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  PopoverProps,
  Transition,
} from "@headlessui/react";
import { usePathname } from "next/navigation";
import { MouseEvent } from "react";

import { SearchStoreProvider } from "#lib/providers/SearchStoreProvider";
import SearchBar from "#ui/SearchBar/SearchBar";
import SearchList from "#ui/SearchList/SearchList";

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
    "flex w-full h-14 flex-col items-center overflow-hidden transition-all duration-300";
  const popoverOpenStyle =
    "h-[70vh] pb-16 rounded-b-2xl max-sm:-translate-x-12 max-sm:w-full-plus-6rem";

  return (
    <Popover className={`${className}`} {...props}>
      {({ open }) => (
        <SearchStoreProvider>
          <PopoverOverlay className="fixed inset-0 bg-black/15" />
          <div
            className={`${popoverDefaultStyle} ${open ? popoverOpenStyle : ""}`}>
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
              <PopoverPanel className="flex w-full shrink grow origin-top justify-center overflow-y-scroll bg-white shadow-lg">
                <SearchList className="min-w-64 max-w-[40rem]" />
              </PopoverPanel>
            </Transition>
          </div>
        </SearchStoreProvider>
      )}
    </Popover>
  );
}

export default HeaderSearch;
