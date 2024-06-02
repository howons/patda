import { Menu, MenuButton, Transition } from "@headlessui/react";
import { IoPersonCircleOutline } from "@react-icons/all-files/io5/IoPersonCircleOutline";
import ProfileDropdown from "@ui/Header/ProfileDropdown";

import { auth } from "@/auth";

async function ProfileMenu() {
  /**@note storybook 과의 호환성을 위해 에러처리 함 (storybook 단독으로 auth()시 에러) */
  try {
    var session = await auth();
  } catch {
    session = null;
  }

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
        <ProfileDropdown session={session} />
      </Transition>
    </Menu>
  );
}

export default ProfileMenu;
