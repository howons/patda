import { redirect } from "next/navigation";

import PlatformProfiles from "#app/profile/(platform)/PlatformProfiles.jsx";
import { auth } from "#auth";
import { getProfile } from "#lib/database/users.js";

export default async function Profile() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return redirect("/");
  }

  const profile = await getProfile(userId);

  return (
    <>
      <PlatformProfiles profile={profile} />
    </>
  );
}
