import { sql } from "@vercel/postgres";
import { ImageResponse } from "next/og";

import type { Database } from "#lib/database/db.js";
import OgImage from "#lib/utils/OgImage.jsx";

export const runtime = "edge";

export const alt = "patda";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  const postId = params.id;

  const sangjuHaerye = fetch(
    new URL("../../SANGJU-Haerye.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const [sqlResults, bgSrc] = await Promise.all([
    sql`SELECT "targetNickname", platform, "etcPlatformName" FROM "Post" WHERE id = ${postId};`,
    fetch(new URL("../../patda_og.jpg", import.meta.url)).then((res) =>
      res.arrayBuffer()
    ),
  ]);

  const { targetNickname, platform, etcPlatformName } = sqlResults
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
          data: await sangjuHaerye,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
