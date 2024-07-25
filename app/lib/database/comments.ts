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

export function deleteComment(id: string) {
  return db
    .deleteFrom("Comment")
    .where("Comment.id", "=", id)
    .executeTakeFirstOrThrow();
}

export const getComments = cache((postId: string) =>
  db
    .selectFrom("Comment")
    .innerJoin("User", "User.id", "Comment.userId")
    .select([
      "Comment.id as id",
      "User.id as userId",
      "User.name as userName",
      "images",
      "content",
      "status",
      "createdAt",
      "updatedAt",
    ])
    .where("postId", "=", postId)
    .execute()
);

export const getComment = cache((id: string) =>
  db.selectFrom("Comment").selectAll().where("id", "=", id).executeTakeFirst()
);
