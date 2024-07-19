import { cache } from "react";

import { db } from "#lib/database/db.js";

export const getUser = cache((userId: string) =>
  db
    .selectFrom("User")
    .selectAll()
    .where("id", "=", userId)
    .executeTakeFirstOrThrow()
);
