import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { sql } from "@vercel/postgres";
import { ImageResponse } from "next/og";

import type { Database } from "#lib/database/db.js";
import OgImage from "#lib/utils/OgImage.jsx";

export const alt = "patda";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  const postId = params.id;

  const fontData = readFile(
    join(process.cwd(), "./public/subset-SANGJUHaerye.woff")
  );

  const [postData, bgData] = await Promise.all([
    sql`SELECT "targetNickname", platform, "etcPlatformName" FROM "Post" WHERE id = ${postId};`,
    readFile(join(process.cwd(), "./public/patda_og.jpg")),
  ]);

  const bgSrc = Uint8Array.from(bgData).buffer;
  const { targetNickname, platform, etcPlatformName } = postData
    .rows[0] as Pick<
    Database["Post"],
    "targetNickname" | "platform" | "etcPlatformName"
  >;

  return new ImageResponse(
    (
      <OgImage
        src={bgSrc}
        name={targetNickname}
        platform={platform}
        etcPlatformName={etcPlatformName}
      />
    ),
    {
      ...size,
      fonts: [
        {
          name: "Haerye",
          data: await fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
