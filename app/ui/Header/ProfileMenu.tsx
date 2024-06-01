import { Menu, MenuButton } from "@headlessui/react";
import { IoPersonCircleOutline } from "@react-icons/all-files/io5/IoPersonCircleOutline";
import ProfileDropdown from "@ui/Header/ProfileDropdown";

function ProfileMenu() {
  return (
    <Menu>
      <MenuButton className="size-12 rounded-full">
        <IoPersonCircleOutline className="size-full" />
      </MenuButton>
      <ProfileDropdown />
    </Menu>
  );
}

export default ProfileMenu;
