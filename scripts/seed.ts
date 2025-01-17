import { db, sql } from "../app/lib/database/db.js";

export async function create() {
  await db.schema
    .createTable("User")
    .ifNotExists()
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("name", "text")
    .addColumn("email", "text", (col) => col.unique())
    .addColumn("emailVerified", "timestamptz")
    .addColumn("image", "text")
    .execute();

  await db.schema
    .createTable("Account")
    .ifNotExists()
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
    .ifNotExists()
    .on("Account")
    .column("userId")
    .execute();

  await db.schema
    .createTable("Session")
    .ifNotExists()
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("sessionToken", "text", (col) => col.notNull().unique())
    .addColumn("expires", "timestamptz", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("VerificationToken")
    .ifNotExists()
    .addColumn("identifier", "text", (col) => col.notNull())
    .addColumn("token", "text", (col) => col.notNull().unique())
    .addColumn("expires", "timestamptz", (col) => col.notNull())
    .execute();

  await db.schema
    .createIndex("Session_userId_index")
    .ifNotExists()
    .on("Session")
    .column("userId")
    .execute();

  await db.schema
    .createTable("Post")
    .ifNotExists()
    .addColumn("id", "integer", (col) =>
      col.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("set null")
    )
    .addColumn("platform", "text", (col) => col.notNull())
    .addColumn("targetNickname", "text", (col) => col.notNull())
    .addColumn("tag", "text", (col) => col.notNull())
    .addColumn("images", sql`text[]`)
    .addColumn("content", "text", (col) => col.notNull())
    .addColumn("status", "text", (col) => col.defaultTo("normal").notNull())
    .addColumn("createdAt", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("updatedAt", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("etcPlatformName", "text")
    .addColumn("additionalInfo", "text")
    .execute();

  await db.schema
    .createTable("Comment")
    .ifNotExists()
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("postId", "integer", (col) =>
      col.references("Post.id").onDelete("cascade").notNull()
    )
    .addColumn("images", sql`text[]`)
    .addColumn("content", "text", (col) => col.notNull())
    .addColumn("status", "text", (col) => col.notNull())
    .addColumn("createdAt", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn("updatedAt", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

  await db.schema
    .createIndex("Comment_postId_index")
    .ifNotExists()
    .on("Comment")
    .column("postId")
    .execute();

  await db.schema
    .createTable("Profile")
    .ifNotExists()
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").unique().notNull()
    )
    .addColumn("daangnNickname", "text")
    .addColumn("daangnInfo", "text")
    .addColumn("bunjangNickname", "text")
    .addColumn("bunjangInfo", "text")
    .addColumn("joongnaNickname", "text")
    .addColumn("joongnaInfo", "text")
    .addColumn("etcNickname", "text")
    .addColumn("etcInfo", "text")
    .addColumn("etcPlatformName", "text")
    .execute();

  console.log("Migration completed");
}

export async function drop() {
  await db.schema.dropTable("Profile").ifExists().execute();
  await db.schema.dropTable("Comment").ifExists().execute();
  await db.schema.dropTable("Post").ifExists().execute();
  await db.schema.dropTable("Session").ifExists().execute();
  await db.schema.dropTable("VerificationToken").ifExists().execute();
  await db.schema.dropTable("Account").ifExists().execute();
  await db.schema.dropTable("User").ifExists().execute();

  console.log("Rollback completed");
}

async function main() {
  await (process.argv[2] === "drop" ? drop() : create());

  process.exit();
}

main();
