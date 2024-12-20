import { createKysely } from "@vercel/postgres-kysely";
import type { Generated, GeneratedAlways } from "kysely";

import type {
  Platform,
  PostCommentStatus,
  TagId,
} from "#lib/types/property.js";

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
    id: GeneratedAlways<number>;
    userId: string;
    platform: Platform;
    targetNickname: string;
    tag: TagId;
    images: string[];
    content: string;
    status: Generated<PostCommentStatus>;
    createdAt: GeneratedAlways<Date>;
    updatedAt: Generated<Date>;
    etcPlatformName: string | null;
    additionalInfo: string | null;
  };
  Comment: {
    id: GeneratedAlways<string>;
    userId: string;
    postId: number;
    images: string[];
    content: string;
    status: PostCommentStatus;
    createdAt: GeneratedAlways<Date>;
    updatedAt: Generated<Date>;
  };
  Profile: {
    userId: string;
    daangnNickname: string | null;
    daangnInfo: string | null;
    bunjangNickname: string | null;
    bunjangInfo: string | null;
    joongnaNickname: string | null;
    joongnaInfo: string | null;
    etcNickname: string | null;
    etcInfo: string | null;
    etcPlatformName: string | null;
  };
}

export const db = createKysely<Database>();
export { sql } from "kysely";
