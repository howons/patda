import { ImageResponse } from "next/og";

import OgImage from "#lib/utils/OgImage.jsx";

export const runtime = "edge";

export const alt = "patda";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const sangjuHaerye = fetch(
    new URL("/subset-SANGJUHaerye.woff", process.env.PATDA_PROJECT_URL)
  ).then((res) => res.arrayBuffer());

  const bgSrc = await fetch(
    new URL("/patda_og.jpg", process.env.PATDA_PROJECT_URL)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(<OgImage src={bgSrc} />, {
    ...size,
    fonts: [
      {
        name: "Haerye",
        data: await sangjuHaerye,
        style: "normal",
        weight: 400,
      },
    ],
  });
}
