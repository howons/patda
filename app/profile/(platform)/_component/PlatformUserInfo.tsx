import type { ComponentProps } from "react";

import InfoText from "#app/profile/(platform)/_component/InfoText.jsx";
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
    <div className={cn("flex items-center gap-4", className)} {...props}>
      {platform === "etc" && (
        <>
          <InfoText>{etcPlatformName}</InfoText>
          <Dot colorStyle={colorStyle} />
        </>
      )}
      <InfoText className="min-w-20">{nickname}</InfoText>
      <Dot colorStyle={colorStyle} />
      <InfoText className="grow">{additionalInfo}</InfoText>
    </div>
  );
}
