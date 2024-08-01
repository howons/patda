import { cache } from "react";

import { type Database, db } from "#lib/database/db.js";

export type NewPostData = Omit<
  Database["Post"],
  "id" | "status" | "createdAt" | "updatedAt"
>;

export type UpdatePostData = Omit<
  Database["Post"],
  "id" | "userId" | "status" | "createdAt" | "updatedAt"
>;

export function createPost(newPostData: NewPostData) {
  return db
    .insertInto("Post")
    .values(newPostData)
    .returning("id")
    .executeTakeFirstOrThrow();
}

export const getPost = cache((postId: string) =>
  db
    .selectFrom("Post")
    .selectAll()
    .where("id", "=", postId)
    .executeTakeFirstOrThrow()
);

export function updatePost(id: string, updatePostData: UpdatePostData) {
  return db
    .updateTable("Post")
    .set(updatePostData)
    .where("id", "=", id)
    .executeTakeFirstOrThrow();
}

export function deletePost(id: string) {
  return db
    .deleteFrom("Post")
    .where("Post.id", "=", id)
    .executeTakeFirstOrThrow();
}
