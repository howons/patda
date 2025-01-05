/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

import OgImage from "#lib/utils/OgImage.jsx";

export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
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
    }
  );
}
