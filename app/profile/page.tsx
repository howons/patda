import { redirect } from "next/navigation";

import PlatformProfiles from "#app/profile/(platform)/PlatformProfiles.jsx";
import { auth } from "#auth";

export default async function Profile() {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  return (
    <>
      <PlatformProfiles />
    </>
  );
}
