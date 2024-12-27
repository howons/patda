import { redirect } from "next/navigation";

import MyPostList from "#app/profile/(myPosts)/MyPostList.jsx";
import PlatformProfiles from "#app/profile/(platform)/PlatformProfiles.jsx";
import SnipedPostListSection from "#app/profile/(sniped)/SnipedPostListSection.jsx";
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
      <SnipedPostListSection profile={profile} className="mt-12" />
      <MyPostList className="mt-12" />
    </>
  );
}
