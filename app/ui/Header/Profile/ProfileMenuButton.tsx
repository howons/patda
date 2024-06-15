import { MenuButton } from "@headlessui/react";
import { IoPersonCircleOutline } from "@react-icons/all-files/io5/IoPersonCircleOutline";
import { Session } from "next-auth";

interface ProfileMenuButtonProps {
  session: Session | null;
}

function ProfileMenuButton({ session }: ProfileMenuButtonProps) {
  return (
    <MenuButton className={`size-12 shrink-0 rounded-full`}>
      <IoPersonCircleOutline className="size-full" />
    </MenuButton>
  );
}

export default ProfileMenuButton;
