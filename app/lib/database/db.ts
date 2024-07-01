import { createKysely } from "@vercel/postgres-kysely";
import type { Generated, GeneratedAlways } from "kysely";

import { Platform, PostCommentStatus } from "#lib/types/property";

export interface Database {
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
    tag: string;
    images: string[] | null;
    content: string;
    status: Generated<PostCommentStatus>;
    createdAt: GeneratedAlways<Date>;
    updatedAt: Generated<Date>;
    anonymousUserNickname: string | null;
    etcPlatformName: string | null;
  };
  Comment: {
    id: GeneratedAlways<string>;
    userId: string;
    postId: string;
    images: string[] | null;
    content: string;
    status: Generated<PostCommentStatus>;
    createdAt: GeneratedAlways<Date>;
    updatedAt: Generated<Date>;
  };
  Image: {
    id: GeneratedAlways<string>;
    url: string;
  };
}

export const db = createKysely<Database>();
export { sql } from "kysely";
