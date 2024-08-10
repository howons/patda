import type { NextRequest } from "next/server";

import { getPostsByNickname } from "#lib/database/posts";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nickname = searchParams.get("nickname");

  const posts = await getPostsByNickname(nickname ?? "");

  return Response.json(posts);
}
