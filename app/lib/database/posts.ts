import { sql } from "kysely";
import { cache } from "react";

import { type Database, db } from "#lib/database/db.js";
import type { Platform } from "#lib/types/property.js";

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

export const getPost = cache((postId: number) =>
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

export const getPostsByNicknamePlatform = cache(
  (
    nickname: string,
    platform: Platform,
    cursor: number,
    limit: number,
    isExclude?: boolean
  ) =>
    db
      .selectFrom("Post")
      .leftJoin(
        (eb) =>
          eb
            .selectFrom("Comment")
            .select(["postId", sql<number>`count(*)`.as("commentCount")])
            .where("postId", "<", cursor)
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
      .where("Post.id", "<", cursor)
      .where("Post.platform", isExclude ? "!=" : "=", platform)
      .where("Post.targetNickname", "like", `${nickname}%`)
      .orderBy("Post.id desc")
      .limit(limit)
      .execute()
);

export function updatePost(id: number, updatePostData: UpdatePostData) {
  return db
    .updateTable("Post")
    .set(updatePostData)
    .where("id", "=", id)
    .executeTakeFirstOrThrow();
}

export function deletePost(id: number) {
  return db
    .deleteFrom("Post")
    .where("Post.id", "=", id)
    .executeTakeFirstOrThrow();
}
