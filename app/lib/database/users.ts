import { cache } from "react";

import { type Database, db } from "#lib/database/db.js";

export type ProfileData = Database["Profile"];

export const getUser = cache((userId: string) =>
  db
    .selectFrom("User")
    .selectAll()
    .where("id", "=", userId)
    .executeTakeFirstOrThrow()
);

export const getProfile = cache((userId: string) =>
  db
    .selectFrom("Profile")
    .select([
      "daangnInfo",
      "daangnNickname",
      "bunjangInfo",
      "bunjangNickname",
      "joongnaInfo",
      "joongnaNickname",
      "etcInfo",
      "etcNickname",
      "etcPlatformName",
    ])
    .where("userId", "=", userId)
    .executeTakeFirst()
);

export function upsertProfile(profileData: ProfileData) {
  return db
    .insertInto("Profile")
    .values(profileData)
    .onConflict((oc) => oc.column("userId").doUpdateSet(profileData))
    .executeTakeFirstOrThrow();
}
