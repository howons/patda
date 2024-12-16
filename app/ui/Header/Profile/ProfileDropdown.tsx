import { MenuHeading, MenuItems, MenuSection } from "@headlessui/react";
import { BiDoorOpen } from "@react-icons/all-files/bi/BiDoorOpen";
import Link from "next/link";
import { Session } from "next-auth";
import { forwardRef } from "react";

import { providerMap } from "#auth";
import { getUserKey } from "#lib/utils/user.js";
import MenuItemButton from "#ui/Header/Profile/MenuItemButton.jsx";
import SignButton from "#ui/Header/Profile/SignButton.jsx";

interface ProfileDropdownProps {
  session: Session | null;
}

const ProfileDropdown = forwardRef<HTMLDivElement, ProfileDropdownProps>(
  ({ session, ...props }, ref) => {
    return (
      <MenuItems
        anchor={{ to: "bottom", gap: "16px", padding: "12px" }}
        className="w-96 origin-top rounded-l-lg rounded-br-lg bg-white/70 p-3 shadow-lg backdrop-blur transition"
        ref={ref}
        {...props}>
        {session?.user ? (
          <MenuSection>
            <MenuHeading className="mb-2 text-sm opacity-50">
              {session.user.name} 님
            </MenuHeading>
            <Link href={`/profile/${getUserKey(session)}`}>
              <MenuItemButton>
                <BiDoorOpen className={`mr-3 size-6 fill-gray-700`} />
                <span>마이페이지</span>
              </MenuItemButton>
            </Link>
            <SignButton isSignout />
          </MenuSection>
        ) : (
          <MenuSection>
            <MenuHeading className="mb-2 text-sm opacity-50">
              로그인•회원가입
            </MenuHeading>
            {Object.values(providerMap).map((providerData) => (
              <SignButton key={providerData.id} providerData={providerData} />
            ))}
          </MenuSection>
        )}
      </MenuItems>
    );
  }
);

ProfileDropdown.displayName = "ProfileDropdown";

export default ProfileDropdown;
