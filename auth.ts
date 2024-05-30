import {
  type Database as KyselyDatabase,
  KyselyAdapter,
  KyselyAuth,
} from "@auth/kysely-adapter";
import { db } from "@lib/database/db";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: KyselyAdapter(db as KyselyAuth<KyselyDatabase>),
  providers: [Google],
});
