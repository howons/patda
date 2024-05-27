import { db, sql } from "../app/lib/database/db.js";

export async function create() {
  await db.schema
    .createTable("User")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("name", "text")
    .addColumn("email", "text", (col) => col.unique().notNull())
    .addColumn("emailVerified", "timestamptz")
    .addColumn("image", "text")
    .execute();

  await db.schema
    .createTable("Account")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn("provider", "text", (col) => col.notNull())
    .addColumn("providerAccountId", "text", (col) => col.notNull())
    .addColumn("refresh_token", "text")
    .addColumn("access_token", "text")
    .addColumn("expires_at", "bigint")
    .addColumn("token_type", "text")
    .addColumn("scope", "text")
    .addColumn("id_token", "text")
    .addColumn("session_state", "text")
    .execute();

  await db.schema
    .createIndex("Account_userId_index")
    .on("Account")
    .column("userId")
    .execute();

  await db.schema
    .createTable("Post")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("set null")
    )
    .addColumn("platform", "text", (col) => col.notNull())
    .addColumn("targetNickname", "text", (col) => col.notNull())
    .addColumn("tags", sql`text[]`, (col) => col.notNull())
    .addColumn("imageUrls", sql`text[]`, (col) => col.notNull())
    .addColumn("content", "text", (col) => col.notNull())
    .addColumn("status", "text", (col) => col.notNull())
    .addColumn("createdAt", "timestamptz", (col) => col.notNull())
    .addColumn("updatedAt", "timestamptz", (col) => col.notNull())
    .addColumn("anonymousUserNickname", "text")
    .addColumn("etcPlatformName", "text")
    .execute();

  await db.schema
    .createIndex("Post_userId_index")
    .on("Post")
    .column("userId")
    .execute();

  await db.schema
    .createTable("Comment")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("postId", "uuid", (col) =>
      col.references("Post.id").onDelete("cascade").notNull()
    )
    .addColumn("imageUrls", sql`text[]`, (col) => col.notNull())
    .addColumn("content", "text", (col) => col.notNull())
    .addColumn("status", "text", (col) => col.notNull())
    .addColumn("createdAt", "timestamptz", (col) => col.notNull())
    .addColumn("updatedAt", "timestamptz", (col) => col.notNull())
    .execute();

  await db.schema
    .createIndex("Comment_userId_index")
    .on("Comment")
    .column("userId")
    .execute();

  await db.schema
    .createIndex("Comment_postId_index")
    .on("Comment")
    .column("postId")
    .execute();

  console.log("Migration completed");
}

export async function drop() {
  await db.schema.dropTable("Account").ifExists().execute();
  await db.schema.dropTable("User").ifExists().execute();
  await db.schema.dropTable("Post").ifExists().execute();
  await db.schema.dropTable("Comment").ifExists().execute();

  console.log("Rollback completed");
}

process.argv[2] === "drop" ? drop() : create();
