import {
  MenuHeading,
  MenuItem,
  MenuItems,
  MenuSection,
} from "@headlessui/react";

import { providerMap, signIn } from "@/auth";
import GoogleLogo from "@/public/google.svg";
import KakaoLogo from "@/public/kakao.svg";
import NaverLogo from "@/public/naver.svg";

function ProfileDropdown() {
  const providerNameKR: Record<string, string> = {
    google: "구글",
    naver: "네이버",
    kakao: "카카오",
  };

  const providerColorStyle: Record<string, string> = {
    google: "text-[#4285F4]",
    naver: "text-[#03C75A]",
    kakao: "text-[#FFCD00]",
  };

  const svgStyle = "size-6 mr-3";
  const ProviderLogo: Record<string, JSX.Element> = {
    google: <GoogleLogo className={`fill-[#4285F4] ${svgStyle}`} />,
    naver: <NaverLogo className={`fill-[#03C75A] ${svgStyle}`} />,
    kakao: <KakaoLogo className={`fill-yellow-950 ${svgStyle}`} />,
  };

  return (
    <MenuItems
      anchor={{ to: "bottom", gap: "16px", padding: "12px" }}
      className="w-96 rounded-l-lg rounded-br-lg bg-white/70 p-3 shadow-lg backdrop-blur">
      <MenuSection>
        <MenuHeading className="mb-2 text-sm opacity-50">
          로그인•회원가입
        </MenuHeading>
        {Object.values(providerMap).map(({ id, name }) => (
          <form
            key={id}
            action={async () => {
              "use server";
              await signIn(id);
            }}>
            <MenuItem>
              <button
                type="submit"
                className="flex h-8 w-full items-center rounded-lg p-6 data-[focus]:bg-gray-400/30">
                {ProviderLogo[id]}
                <span>
                  <b className={`${providerColorStyle[id] ?? ""}`}>
                    {providerNameKR[id] ?? name}
                  </b>
                  로 로그인하기
                </span>
              </button>
            </MenuItem>
          </form>
        ))}
      </MenuSection>
    </MenuItems>
  );
}

export default ProfileDropdown;
