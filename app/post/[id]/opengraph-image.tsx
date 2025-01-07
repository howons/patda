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
    new URL("/subset-SANGJUHaerye.woff", process.env.PATDA_PROJECT_URL)
  ).then((res) => res.arrayBuffer());

  const [postData, bgSrc] = await Promise.all([
    fetch(
      new URL(`./api/v1/posts/${postId}`, process.env.PATDA_PROJECT_URL)
    ).then((res) => res.json()),
    fetch(new URL("/patda_og.jpg", process.env.PATDA_PROJECT_URL)).then((res) =>
      res.arrayBuffer()
    ),
  ]);

  const { targetNickname, platform, etcPlatformName } = postData as Pick<
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
