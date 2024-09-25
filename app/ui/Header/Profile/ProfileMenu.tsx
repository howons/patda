import { Menu, Transition } from "@headlessui/react";

import { auth } from "#auth";
import ProfileDropdown from "#ui/Header/Profile/ProfileDropdown.jsx";
import ProfileMenuButton from "#ui/Header/Profile/ProfileMenuButton.jsx";

async function ProfileMenu() {
  const session = await auth();

  return (
    <Menu>
      <ProfileMenuButton isLogin={!!session} />
      <Transition
        enter="duration-200 ease-out"
        enterFrom="scale-95 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-95 opacity-0">
        <ProfileDropdown session={session} />
      </Transition>
    </Menu>
  );
}

export default ProfileMenu;
