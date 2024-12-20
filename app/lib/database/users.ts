import { cache } from "react";

import { db } from "#lib/database/db.js";

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
