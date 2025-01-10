"use client";

import { MenuButton } from "@headlessui/react";
import { FiMoreHorizontal } from "@react-icons/all-files/fi/FiMoreHorizontal";
import { IoPersonCircleOutline } from "@react-icons/all-files/io5/IoPersonCircleOutline";
import { cva, type VariantProps } from "class-variance-authority";

import type { ProfileData } from "#lib/database/users.js";
import { useProfileRef } from "#lib/providers/ProfileRefProvider.jsx";
import DaangnLogo from "#public/당근.svg";
import BunjangLogo from "#public/번개장터.svg";
import JoongnaLogo from "#public/중고나라.svg";
import { cn } from "#utils/utils.js";

const menuButtonVariants = cva("size-12 shrink-0 rounded-full border-2", {
  variants: {
    theme: {
      none: "",
      daangn: "border-orange-500 bg-orange-100",
      bunjang: "border-red-500 bg-red-100",
      joongna: "border-green-500 bg-green-100",
      etc: "border-zinc-500 bg-zinc-100",
    },
  },
  defaultVariants: {
    theme: "none",
  },
});

interface ProfileMenuButtonProps {
  isLogin: boolean;
  profileData?: Omit<ProfileData, "userId">;
}

export default function ProfileMenuButton({
  isLogin,
  profileData,
}: ProfileMenuButtonProps) {
  const profileRef = useProfileRef();

  let MenuIcon = <IoPersonCircleOutline className="size-full" />;
  let theme: VariantProps<typeof menuButtonVariants>["theme"] = "none";
  if (isLogin) {
    if (profileData?.daangnNickname) {
      MenuIcon = <DaangnLogo className="size-full" />;
      theme = "daangn";
    } else if (profileData?.bunjangNickname) {
      MenuIcon = <BunjangLogo className="size-full" />;
      theme = "bunjang";
    } else if (profileData?.joongnaNickname) {
      MenuIcon = <JoongnaLogo className="size-full" />;
      theme = "joongna";
    } else {
      MenuIcon = <FiMoreHorizontal className="size-full" />;
      theme = "etc";
    }
  }

  return (
    <MenuButton className={cn(menuButtonVariants({ theme }))} ref={profileRef}>
      {MenuIcon}
    </MenuButton>
  );
}
