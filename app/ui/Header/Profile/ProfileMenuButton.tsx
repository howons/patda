"use client";

import { MenuButton } from "@headlessui/react";
import { IoPersonCircleOutline } from "@react-icons/all-files/io5/IoPersonCircleOutline";
import { Session } from "next-auth";
import { useEffect, useRef } from "react";

import { useProfileRefStore } from "#lib/providers/ProfileRefProvider.jsx";

interface ProfileMenuButtonProps {
  session: Session | null;
}

function ProfileMenuButton({ session }: ProfileMenuButtonProps) {
  const profileRef = useRef<HTMLButtonElement>(null);
  const updateProfileRef = useProfileRefStore(
    (store) => store.updateProfileRef
  );

  useEffect(() => {
    updateProfileRef(profileRef.current);
  }, [updateProfileRef]);

  return (
    <MenuButton className={`size-12 shrink-0 rounded-full`} ref={profileRef}>
      <IoPersonCircleOutline className="size-full" />
    </MenuButton>
  );
}

export default ProfileMenuButton;
