import PlatformProfiles from "#app/profile/[userKey]/(platform)/PlatformProfiles.jsx";

export default function Profile({ params }: { params: { userKey: string } }) {
  return (
    <>
      <h1>프로필</h1>
      <PlatformProfiles />
    </>
  );
}
