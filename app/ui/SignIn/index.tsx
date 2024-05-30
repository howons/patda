import { OAuthProviderType } from "next-auth/providers";

import { signIn } from "@/auth";

export function SignIn({ provider }: { provider: OAuthProviderType }) {
  const providerName: Partial<Record<OAuthProviderType, string>> = {
    google: "구글",
    naver: "네이버",
    kakao: "카카오",
  };

  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}>
      <button type="submit">
        <b>{providerName[provider] ?? provider}</b>로 로그인
      </button>
    </form>
  );
}
