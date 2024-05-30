import { SignIn } from "@ui/SignIn";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-28 pt-14">
      <SignIn provider="google" />
    </main>
  );
}
