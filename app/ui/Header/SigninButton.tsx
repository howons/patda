import { MenuItem } from "@headlessui/react";

import { signIn } from "@/auth";
import GoogleLogo from "@/public/google.svg";
import KakaoLogo from "@/public/kakao.svg";
import NaverLogo from "@/public/naver.svg";

interface SigninButtonProps {
  id: string;
  name: string;
}

function SigninButton({ id, name }: SigninButtonProps) {
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
    <form
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
  );
}

export default SigninButton;
