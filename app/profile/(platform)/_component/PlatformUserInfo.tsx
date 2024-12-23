import type { ComponentProps } from "react";

import InfoText from "#app/profile/(platform)/_component/InfoText.jsx";
import {
  PLATFORM_COLOR,
  PLATFORM_PLACEHOLDER,
} from "#lib/constants/platform.js";
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
            defaultValue={etcPlatformName}
            colorStyle={colorStyle}
            readOnly={!isEdit}
            placeholder="사이트명"
            className="w-16 flex-auto"
          />
          <Dot colorStyle={colorStyle} />
        </>
      )}
      <InfoText
        defaultValue={nickname}
        colorStyle={colorStyle}
        readOnly={!isEdit}
        placeholder="닉네임"
        className="w-20 flex-auto"
      />
      <Dot colorStyle={colorStyle} />
      <InfoText
        defaultValue={additionalInfo}
        colorStyle={colorStyle}
        readOnly={!isEdit}
        placeholder={`추가 정보 (${PLATFORM_PLACEHOLDER[platform]})`}
        className="w-48 flex-auto"
      />
    </div>
  );
}
