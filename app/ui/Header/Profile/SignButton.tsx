import { IoLogOutOutline } from "@react-icons/all-files/io5/IoLogOutOutline";

import { signIn, signOut } from "#auth";
import GoogleLogo from "#public/google.svg";
import KakaoLogo from "#public/kakao.svg";
import NaverLogo from "#public/naver.svg";
import MenuItemButton from "#ui/Header/Profile/MenuItemButton";

interface SignButtonProps {
  providerData?: { id: string; name: string };
  isSignout?: boolean;
}

function SignButton({
  providerData: { id, name } = { id: "", name: "" },
  isSignout,
}: SignButtonProps) {
  const submitAction = async (id: string, formData: FormData) => {
    "use server";
    await (isSignout ? signOut() : signIn(id));
  };

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
    <form action={submitAction.bind(null, id)}>
      <MenuItemButton type="submit">
        {isSignout ? (
          <>
            <IoLogOutOutline className={`fill-gray-700 ${svgStyle}`} />
            <span>로그아웃</span>
          </>
        ) : (
          <>
            {ProviderLogo[id]}
            <span>
              <b className={`${providerColorStyle[id] ?? ""}`}>
                {providerNameKR[id] ?? name}
              </b>
              로 로그인하기
            </span>
          </>
        )}
      </MenuItemButton>
    </form>
  );
}

export default SignButton;
