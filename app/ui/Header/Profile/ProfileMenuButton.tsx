"use client";

import { MenuButton } from "@headlessui/react";
import { IoPersonCircleOutline } from "@react-icons/all-files/io5/IoPersonCircleOutline";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

interface ProfileMenuButtonProps {
  session: Session | null;
}

function ProfileMenuButton({ session }: ProfileMenuButtonProps) {
  const pathname = usePathname();

  const mediaStyle = pathname === "/" ? "sm:ml-36" : "lg:ml-36";

  return (
    <MenuButton className={`size-12 shrink-0 rounded-full ${mediaStyle}`}>
      <IoPersonCircleOutline className="size-full" />
    </MenuButton>
  );
}

export default ProfileMenuButton;
