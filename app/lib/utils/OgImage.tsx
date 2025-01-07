/* eslint-disable @next/next/no-img-element */

import type { Platform } from "#lib/types/property.js";
import Icon from "#public/icon.svg";
import DaangnLogo from "#public/당근.svg";
import BunjangLogo from "#public/번개장터.svg";
import JoongnaLogo from "#public/중고나라.svg";

const TEXT_COLOR: { [key in Platform]: string } = {
  daangn: "rgb(234 88 12)",
  bunjang: "rgb(220 38 38)",
  joongna: "rgb(22 163 74)",
  etc: "rgb(82 82 91)",
};

interface OgImageProps {
  src: string | ArrayBuffer;
  name?: string;
  platform?: Platform;
  etcPlatformName?: string | null;
}

export default function OgImage({
  src,
  name = "당근빳다",
  platform,
  etcPlatformName,
}: OgImageProps) {
  const nameHalfIdx = Math.floor(name.length / 2);
  const frontName = name.slice(0, nameHalfIdx);
  const backName = name.slice(nameHalfIdx);

  let fontSize = 144;
  if (name.length > 8) {
    fontSize = 96;
  } else if (name.length > 6) {
    fontSize = 112;
  } else if (name.length > 4) {
    fontSize = 128;
  }

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
    IconSvg = (
      <span
        style={{
          ...iconStyle,
          fontSize: 48,
          color: "rgb(82 82 91)",
          width: (etcPlatformName?.length ?? 0) % 2 ? 150 : 100,
        }}>
        {etcPlatformName}
      </span>
    );
  }

  return (
    <div
      style={{
        fontSize,
        color: TEXT_COLOR[platform ?? "daangn"],
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
          top: "37%",
          minHeight: frontName.length <= 0 ? "13rem" : 0,
          transform: "rotate(15deg)",
          transformOrigin: "top left",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          padding:
            frontName.length < backName.length
              ? "1rem 1rem 1rem 8rem"
              : "1rem 1rem 1rem 3rem",
          borderRadius: "1rem 0 0 1rem",
          boxShadow: "-3px 8px 7px rgba(0, 0, 0, 0.25)",
        }}>
        {frontName}
      </div>
      <div
        style={{
          position: "absolute",
          left: "57%",
          top: "37%",
          transform: "rotate(-15deg)",
          transformOrigin: "top right",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          padding: "1rem 3rem 1rem 1rem",
          borderRadius: "0 1rem 1rem 0",
          boxShadow: "3px 8px 7px rgba(0, 0, 0, 0.25)",
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
