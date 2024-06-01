import { Menu, MenuButton, Transition } from "@headlessui/react";
import { IoPersonCircleOutline } from "@react-icons/all-files/io5/IoPersonCircleOutline";
import ProfileDropdown from "@ui/Header/ProfileDropdown";

function ProfileMenu() {
  return (
    <Menu>
      <MenuButton className="size-12 rounded-full">
        <IoPersonCircleOutline className="size-full" />
      </MenuButton>
      <Transition
        enter="duration-200 ease-out"
        enterFrom="scale-95 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-95 opacity-0">
        <ProfileDropdown />
      </Transition>
    </Menu>
  );
}

export default ProfileMenu;
