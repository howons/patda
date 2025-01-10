import { cache } from "react";

import { type Database, db } from "#lib/database/db.js";

export type NewCommentData = Omit<
  Database["Comment"],
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateCommentData = Pick<Database["Comment"], "content" | "images">;

export function createComment(newCommentData: NewCommentData) {
  return db
    .insertInto("Comment")
    .values(newCommentData)
    .returning("id")
    .executeTakeFirstOrThrow();
}

export const getComments = cache((postId: number) =>
  db
    .selectFrom("Comment")
    .innerJoin("User", "User.id", "Comment.userId")
    .leftJoin("Profile", "Profile.userId", "Comment.userId")
    .select([
      "Comment.id as id",
      "User.id as userId",
      "Profile.daangnNickname as daangnNickname",
      "Profile.bunjangNickname as bunjangNickname",
      "Profile.joongnaNickname as joongnaNickname",
      "Profile.etcNickname as etcNickname",
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
  db
    .selectFrom("Comment")
    .innerJoin("User", "User.id", "Comment.userId")
    .select([
      "Comment.id as id",
      "User.id as userId",
      "images",
      "content",
      "status",
      "createdAt",
      "updatedAt",
    ])
    .where("Comment.id", "=", id)
    .executeTakeFirst()
);

export function updateComment(
  id: string,
  updateCommentData: UpdateCommentData
) {
  return db
    .updateTable("Comment")
    .set(updateCommentData)
    .where("Comment.id", "=", id)
    .executeTakeFirstOrThrow();
}

export function deleteComment(id: string) {
  return db
    .deleteFrom("Comment")
    .where("Comment.id", "=", id)
    .executeTakeFirstOrThrow();
}
