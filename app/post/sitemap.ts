import type { MetadataRoute } from "next";

import { db } from "#lib/database/db.js";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await db
    .selectFrom("Post")
    .select(["id", "updatedAt"])
    .execute();

  return posts.map((post) => ({
    url: `https://patda.store/post/${post.id}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));
}
