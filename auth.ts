import {
  type Database as KyselyDatabase,
  KyselyAdapter,
  KyselyAuth,
} from "@auth/kysely-adapter";
import NextAuth from "next-auth";
import { Provider } from "next-auth/providers";
import Google from "next-auth/providers/google";
import kakao from "next-auth/providers/kakao";
import naver from "next-auth/providers/naver";

import { db } from "#lib/database/db.js";

const providers: Provider[] = [Google, naver, kakao];

export const providerMap = providers.map((provider) => {
  const providerData = typeof provider === "function" ? provider() : provider;
  return {
    id: providerData.id,
    name: providerData.name,
  };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: KyselyAdapter(db as KyselyAuth<KyselyDatabase>),
  providers,
});
