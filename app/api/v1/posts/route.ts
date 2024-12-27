import { type NextRequest, NextResponse } from "next/server";

import { PLATFORM_SET } from "#lib/constants/platform.js";
import {
  getPostsByNicknamePlatform,
  getPostsByTargetInfo,
} from "#lib/database/posts";
import type { Platform } from "#lib/types/property.js";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const cursorParam = searchParams.get("cursor");
  const limitParam = searchParams.get("limit");

  const cursor = cursorParam ? Number(cursorParam) : 999999;
  if (Number.isNaN(cursor)) {
    return NextResponse.json(
      { error: "cursor is incorrect." },
      { status: 400 }
    );
  }
  const limit = limitParam ? Number(limitParam) : 10;
  if (Number.isNaN(limit)) {
    return NextResponse.json({ error: "limit is incorrect." }, { status: 400 });
  }
  const platform = searchParams.get("platform");

  if (platform) {
    if (!PLATFORM_SET.has(platform)) {
      return NextResponse.json(
        { error: "platform is incorrect." },
        { status: 400 }
      );
    }

    const nickname = searchParams.get("nickname");
    const isExclude = searchParams.get("exclude");

    try {
      const posts = await getPostsByNicknamePlatform(
        nickname ?? "",
        platform as Platform,
        cursor,
        limit,
        !(isExclude === null || isExclude === "false")
      );

      return NextResponse.json({
        data: posts,
        nextCursor: posts.at(-1)?.id ?? 0,
      });
    } catch (err) {
      console.error(err);

      return NextResponse.json(
        { error: "Database error occurred" },
        { status: 500 }
      );
    }
  } else {
    const profileData = {
      daangnNickname: searchParams.get("dNick"),
      daangnInfo: searchParams.get("dInfo"),
      bunjangNickname: searchParams.get("bNick"),
      bunjangInfo: searchParams.get("bInfo"),
      joongnaNickname: searchParams.get("jNick"),
      joongnaInfo: searchParams.get("jInfo"),
      etcNickname: searchParams.get("eNick"),
      etcInfo: searchParams.get("eInfo"),
      etcPlatformName: searchParams.get("eName"),
    };

    try {
      const posts = await getPostsByTargetInfo(profileData, cursor, limit);

      return NextResponse.json({
        data: posts,
        nextCursor: posts.at(-1)?.id ?? 0,
      });
    } catch (err) {
      console.error(err);

      return NextResponse.json(
        { error: "Database error occurred" },
        { status: 500 }
      );
    }
  }
}
