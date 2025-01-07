import { type NextRequest, NextResponse } from "next/server";

import { getPost } from "#lib/database/posts";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const postId = Number((await params).id);

  try {
    const post = await getPost(postId);

    return NextResponse.json(post);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Database error occurred" },
      { status: 500 }
    );
  }
}
