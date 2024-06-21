import { Menu, Transition } from "@headlessui/react";

import { auth } from "#auth";
import ProfileDropdown from "#ui/Header/Profile/ProfileDropdown";
import ProfileMenuButton from "#ui/Header/Profile/ProfileMenuButton";

async function ProfileMenu() {
  /**@note storybook 과의 호환성을 위해 에러처리 함 (storybook 단독으로 await auth()시 에러) */
  try {
    var session = await auth();
  } catch {
    session = null;
  }

  return (
    <Menu>
      <ProfileMenuButton session={session} />
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
