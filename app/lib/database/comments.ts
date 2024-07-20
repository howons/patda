import { cache } from "react";

import { type Database, db } from "#lib/database/db.js";

export type NewCommentData = Omit<
  Database["Comment"],
  "id" | "createdAt" | "updatedAt"
>;

export function createComment(newCommentData: NewCommentData) {
  return db
    .insertInto("Comment")
    .values(newCommentData)
    .returning("id")
    .executeTakeFirstOrThrow();
}

export const getComments = cache((postId: string) =>
  db.selectFrom("Comment").selectAll().where("id", "=", postId).execute()
);
