import { type NextRequest, NextResponse } from "next/server";

import { auth } from "#auth";
import { getPostsByUserId } from "#lib/database/posts";

export async function GET(request: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "unauthorized." }, { status: 401 });
  }

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

  try {
    const posts = await getPostsByUserId(userId, cursor, limit);

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
