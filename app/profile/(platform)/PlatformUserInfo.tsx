import type { ComponentProps } from "react";

import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import type { Platform } from "#lib/types/property.js";
import Dot from "#ui/Dot/Dot.jsx";
import { cn } from "#utils/utils.js";

interface PlatformUserInfoProps extends ComponentProps<"div"> {
  platform: Platform;
  nickname: string;
  additionalInfo: string;
  etcPlatformName?: string;
}

export default function PlatformUserInfo({
  platform,
  nickname,
  additionalInfo,
  etcPlatformName,
  className,
  ...props
}: PlatformUserInfoProps) {
  const colorStyle = PLATFORM_COLOR[platform];

  return (
    <div className={cn(className)} {...props}>
      {etcPlatformName !== undefined && (
        <>
          <p>{etcPlatformName}</p>
          <Dot colorStyle={colorStyle} />{" "}
        </>
      )}
      <p>{nickname}</p>
      <Dot colorStyle={colorStyle} />
      <p>{additionalInfo}</p>
    </div>
  );
}
