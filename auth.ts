import {
  type Database as KyselyDatabase,
  KyselyAdapter,
  KyselyAuth,
} from "@auth/kysely-adapter";
import { db } from "@lib/database/db";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Session과 VerificationToken 테이블은 사용하지 않을 예정으로 db에서 제외하였으나, KyselyAdapter에 전달을 위해 타입을 단언함.
  adapter: KyselyAdapter(db as KyselyAuth<KyselyDatabase>),
  providers: [Google],
});
