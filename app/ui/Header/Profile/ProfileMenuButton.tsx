"use client";

import { MenuButton } from "@headlessui/react";
import { IoPersonCircleOutline } from "@react-icons/all-files/io5/IoPersonCircleOutline";

import { useProfileRef } from "#lib/providers/ProfileRefProvider.jsx";

interface ProfileMenuButtonProps {
  isLogin: boolean;
}

function ProfileMenuButton({ isLogin }: ProfileMenuButtonProps) {
  const profileRef = useProfileRef();

  return (
    <MenuButton className={`size-12 shrink-0 rounded-full`} ref={profileRef}>
      <IoPersonCircleOutline className="size-full" />
    </MenuButton>
  );
}

export default ProfileMenuButton;
