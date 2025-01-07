import { ImageResponse } from "next/og";

import OgImage from "#lib/utils/OgImage.jsx";

export const runtime = "edge";

// Image metadata
export const alt = "patda";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font
  const sangjuHaerye = fetch(
    new URL("./subset-SANGJUHaerye.woff", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const bgSrc = await fetch(new URL("./patda_og.jpg", import.meta.url)).then(
    (res) => res.arrayBuffer()
  );

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <OgImage src={bgSrc} />
    ),
    // ImageResponse options
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
