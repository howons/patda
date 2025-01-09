import { Menu, Transition } from "@headlessui/react";

import { auth } from "#auth";
import { getProfile, type ProfileData } from "#lib/database/users.js";
import ProfileDropdown from "#ui/Header/Profile/ProfileDropdown.jsx";
import ProfileMenuButton from "#ui/Header/Profile/ProfileMenuButton.jsx";

export default async function ProfileMenu() {
  const session = await auth();
  const userId = session?.user?.id;

  let profileData: Omit<ProfileData, "userId"> | undefined;
  if (userId) {
    profileData = await getProfile(userId);
  }

  return (
    <Menu>
      <ProfileMenuButton isLogin={!!session} profileData={profileData} />
      <Transition
        enter="duration-200 ease-out"
        enterFrom="scale-95 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-95 opacity-0">
        <ProfileDropdown isLogin={!!session} profileData={profileData} />
      </Transition>
    </Menu>
  );
}
