/* eslint-disable @next/next/no-img-element */

import type { Platform } from "#lib/types/property.js";
import Icon from "#public/icon.svg";
import DaangnLogo from "#public/당근.svg";
import BunjangLogo from "#public/번개장터.svg";
import JoongnaLogo from "#public/중고나라.svg";

interface OgImageProps {
  src: string | ArrayBuffer;
  name?: string;
  platform?: Platform;
}

export default function OgImage({
  src,
  name = "당근빳다",
  platform,
}: OgImageProps) {
  const nameHalfIdx = Math.round(name.length / 2);
  const frontName = name.slice(0, nameHalfIdx);
  const backName = name.slice(nameHalfIdx);

  const iconStyle = {
    height: 120,
    width: 120,
  };

  let IconSvg = <Icon style={iconStyle} />;
  if (platform === "daangn") {
    IconSvg = <DaangnLogo style={iconStyle} />;
  } else if (platform === "bunjang") {
    IconSvg = <BunjangLogo style={iconStyle} />;
  } else if (platform === "joongna") {
    IconSvg = <JoongnaLogo style={iconStyle} />;
  } else if (platform === "etc") {
    IconSvg = <></>;
  }

  return (
    <div
      style={{
        fontSize: 128,
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
      }}>
      <img
        src={src as unknown as string}
        alt="background image"
        height="630"
        style={{ width: "100%", height: "100%" }}
      />
      <div
        style={{
          position: "absolute",
          right: "40%",
          top: "40%",
          transform: "rotate(15deg)",
          transformOrigin: "top left",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          padding: "0 1rem 0 1rem",
          borderRadius: "1rem 0 0 1rem",
        }}>
        {frontName}
      </div>
      <div
        style={{
          position: "absolute",
          left: "57%",
          top: "40%",
          transform: "rotate(-15deg)",
          transformOrigin: "top right",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          padding: "0 1rem 0 1rem",
          borderRadius: "0 1rem 1rem 0",
        }}>
        {backName}
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: 0,
          top: 0,
        }}>
        {IconSvg}
      </div>
    </div>
  );
}
