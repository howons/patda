import { type NextRequest, NextResponse } from "next/server";

import { PLATFORM_ID } from "#lib/constants/platform.js";
import { getPostsByNicknamePlatform } from "#lib/database/posts";
import type { Platform } from "#lib/types/property.js";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nickname = searchParams.get("nickname");
  const platform = searchParams.get("platform");
  const cursor = Number(searchParams.get("cursor"));
  const limit = Number(searchParams.get("limit"));
  const isExclude = searchParams.get("isExclude");

  if (!nickname) {
    return NextResponse.json(
      { error: "nickname is required." },
      { status: 400 }
    );
  }
  if (!platform || !(platform in PLATFORM_ID)) {
    return NextResponse.json(
      { error: "platform is incorrect." },
      { status: 400 }
    );
  }
  if (Number.isNaN(cursor)) {
    return NextResponse.json(
      { error: "cursor is incorrect." },
      { status: 400 }
    );
  }
  if (Number.isNaN(limit)) {
    return NextResponse.json({ error: "limit is incorrect." }, { status: 400 });
  }

  try {
    const posts = await getPostsByNicknamePlatform({
      nickname,
      platform: platform as Platform,
      cursor,
      limit,
      isExclude: !(isExclude === null || isExclude === "false"),
    });

    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json(
      { error: "Database error occurred" },
      { status: 500 }
    );
  }
}
