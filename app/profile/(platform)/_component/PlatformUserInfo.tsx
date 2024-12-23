import type { ComponentProps } from "react";

import InfoText from "#app/profile/(platform)/_component/InfoText.jsx";
import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import type { Platform } from "#lib/types/property.js";
import Dot from "#ui/Dot/Dot.jsx";
import Input from "#ui/formItems/Input.jsx";
import { cn } from "#utils/utils.js";

interface PlatformUserInfoProps extends ComponentProps<"div"> {
  platform: Platform;
  nickname: string;
  additionalInfo: string;
  etcPlatformName?: string;
  isEdit?: boolean;
}

export default function PlatformUserInfo({
  platform,
  nickname,
  additionalInfo,
  etcPlatformName,
  isEdit,
  className,
  ...props
}: PlatformUserInfoProps) {
  const colorStyle = PLATFORM_COLOR[platform];

  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      {platform === "etc" && (
        <>
          <InfoText
            text={etcPlatformName ?? ""}
            colorStyle={colorStyle}
            isEdit={isEdit}
          />
          <Dot colorStyle={colorStyle} />
        </>
      )}
      <InfoText
        text={nickname}
        colorStyle={colorStyle}
        isEdit={isEdit}
        className="min-w-20"
      />
      <Dot colorStyle={colorStyle} />
      <Input
        defaultValue={additionalInfo}
        colorStyle={colorStyle}
        readOnly={!isEdit}
        className="grow border-x-0 border-t-0"
      />
    </div>
  );
}
