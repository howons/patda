import { sql } from "kysely";
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
    .leftJoin(
      (eb) =>
        eb
          .selectFrom("Comment")
          .select(["postId", sql<number>`count(*)`.as("commentCount")])
          .groupBy("postId")
          .where("postId", "=", postId)
          .as("c"),
      (join) => join.onRef("c.postId", "=", "Post.id")
    )
    .select([
      "id",
      "userId",
      "platform",
      "targetNickname",
      "tag",
      "status",
      "images",
      "content",
      "createdAt",
      "updatedAt",
      "etcPlatformName",
      "additionalInfo",
      "commentCount",
    ])
    .where("id", "=", postId)
    .executeTakeFirstOrThrow()
);

export const getPostsByNickname = cache((nickname: string) =>
  db
    .selectFrom("Post")
    .leftJoin(
      (eb) =>
        eb
          .selectFrom("Comment")
          .select(["postId", sql<number>`count(*)`.as("commentCount")])
          .groupBy("postId")
          .as("c"),
      (join) => join.onRef("c.postId", "=", "Post.id")
    )
    .select([
      "id",
      "platform",
      "targetNickname",
      "tag",
      "status",
      "createdAt",
      "updatedAt",
      "etcPlatformName",
      "additionalInfo",
      "commentCount",
    ])
    .where("Post.targetNickname", "like", `%${nickname}%`)
    .orderBy("Post.createdAt desc")
    .execute()
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
