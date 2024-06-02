import { MenuHeading, MenuItems, MenuSection } from "@headlessui/react";
import SigninButton from "@ui/Header/SigninButton";
import { forwardRef } from "react";

import { providerMap } from "@/auth";

const ProfileDropdown = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <MenuItems
      anchor={{ to: "bottom", gap: "16px", padding: "12px" }}
      className="w-96 origin-top rounded-l-lg rounded-br-lg bg-white/70 p-3 shadow-lg backdrop-blur transition"
      ref={ref}
      {...props}>
      <MenuSection>
        <MenuHeading className="mb-2 text-sm opacity-50">
          로그인•회원가입
        </MenuHeading>
        {Object.values(providerMap).map(({ id, name }) => (
          <SigninButton key={id} id={id} name={name} />
        ))}
      </MenuSection>
    </MenuItems>
  );
});

ProfileDropdown.displayName = "ProfileDropdown";

export default ProfileDropdown;
