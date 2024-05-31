import { providerMap, signIn } from "@/auth";

export default function SignIn() {
  const providerNameKR: Record<string, string> = {
    google: "구글",
    naver: "네이버",
    kakao: "카카오",
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center pb-28 pt-14">
      {Object.values(providerMap).map(({ id, name }) => (
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
      ))}
    </main>
  );
}
