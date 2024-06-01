import { MenuItem, MenuItems } from "@headlessui/react";

import { providerMap, signIn } from "@/auth";

function ProfileDropdown() {
  const providerNameKR: Record<string, string> = {
    google: "구글",
    naver: "네이버",
    kakao: "카카오",
  };

  return (
    <MenuItems anchor="bottom" className="w-11/12 max-w-96 p-2">
      {Object.values(providerMap).map(({ id, name }) => (
        <MenuItem key={id}>
          <form
            key={id}
            action={async () => {
              "use server";
              await signIn(id);
            }}>
            <button type="submit">
              <span>Sign in with {providerNameKR[id] ?? name}</span>
            </button>
          </form>
        </MenuItem>
      ))}
    </MenuItems>
  );
}

export default ProfileDropdown;
