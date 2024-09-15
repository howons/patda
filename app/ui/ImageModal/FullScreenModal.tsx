"use client";

import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";

import usePopstate from "#lib/hooks/usePopstate.js";

interface FullScreenModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function FullScreenModal({
  isOpen,
  setIsOpen,
  children,
}: PropsWithChildren<FullScreenModalProps>) {
  const { handleExternalPopAction: handleCloseClick } = usePopstate({
    onPopstate: () => setIsOpen(false),
    condition: isOpen,
  });

  return (
    <Dialog open={isOpen} onClose={handleCloseClick} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/70" />
      <div className="fixed inset-0 flex h-screen w-screen items-center justify-center p-4">
        <DialogPanel>{children}</DialogPanel>
        <CloseButton className="absolute right-4 top-4 cursor-pointer opacity-80 hover:opacity-50">
          <IoClose className="size-8 fill-neutral-200" />
        </CloseButton>
      </div>
    </Dialog>
  );
}
