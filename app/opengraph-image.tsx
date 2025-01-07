import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import OgImage from "#lib/utils/OgImage.jsx";

export const alt = "patda";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const fontData = readFile(
    join(process.cwd(), "public", "subset-SANGJUHaerye.woff")
  );

  const bgData = await readFile(join(process.cwd(), "public", "patda_og.jpg"));
  const bgSrc = Uint8Array.from(bgData).buffer;

  return new ImageResponse(<OgImage src={bgSrc} />, {
    ...size,
    fonts: [
      {
        name: "Haerye",
        data: await fontData,
        style: "normal",
        weight: 400,
      },
    ],
  });
}
