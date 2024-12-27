import type { Session } from "next-auth";

export function getUserKey(session: Session) {
  const userNameKey = encodeURIComponent(session.user?.name ?? "").replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  const userId = session.user?.id ?? "";

  return `${userNameKey}${userId.slice(0, 5)}`;
}
