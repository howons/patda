import { Platform, PostCommentStatus } from "@lib/types/property";
import { createKysely } from "@vercel/postgres-kysely";
import type { GeneratedAlways } from "kysely";

interface Database {
  User: {
    id: GeneratedAlways<string>;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
  };
  Account: {
    id: GeneratedAlways<string>;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
  };
  Session: {
    id: GeneratedAlways<string>;
    userId: string;
    sessionToken: string;
    expires: Date;
  };
  VerificationToken: {
    identifier: string;
    token: string;
    expires: Date;
  };
  Post: {
    id: GeneratedAlways<string>;
    userId: string | null;
    platform: Platform;
    targetNickname: string;
    tags: string[];
    imageUrls: string[];
    content: string;
    status: PostCommentStatus;
    createdAt: Date;
    updatedAt: Date;
    anonymousUserNickname: string | null;
    etcPlatformName: string | null;
  };
  Comment: {
    id: GeneratedAlways<string>;
    userId: string;
    postId: string;
    imageUrls: string[];
    content: string;
    status: PostCommentStatus;
    createdAt: Date;
    updatedAt: Date;
  };
}

export const db = createKysely<Database>();
export { sql } from "kysely";
