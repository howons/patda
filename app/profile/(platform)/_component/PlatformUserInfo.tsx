import type { ComponentProps } from "react";
import type { UseFormRegister } from "react-hook-form";

import InfoText from "#app/profile/(platform)/_component/InfoText.jsx";
import type { ProfileFormValues } from "#lib/actions/profile/updateProfileAction.js";
import {
  PLATFORM_COLOR,
  PLATFORM_PLACEHOLDER,
} from "#lib/constants/platform.js";
import type { Platform } from "#lib/types/property.js";
import Dot from "#ui/Dot/Dot.jsx";
import { cn } from "#utils/utils.js";

interface PlatformUserInfoProps extends ComponentProps<"div"> {
  platform: Platform;
  nickname: string;
  additionalInfo: string;
  etcPlatformName?: string;
  isEdit?: boolean;
  register: UseFormRegister<ProfileFormValues>;
}

export default function PlatformUserInfo({
  platform,
  nickname,
  additionalInfo,
  etcPlatformName,
  isEdit,
  register,
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
            {...register("etcPlatformName")}
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
        {...register("nickname")}
      />
      <Dot colorStyle={colorStyle} />
      <InfoText
        defaultValue={additionalInfo}
        colorStyle={colorStyle}
        readOnly={!isEdit}
        placeholder={`추가 정보 (${PLATFORM_PLACEHOLDER[platform]})`}
        className="w-48 flex-auto"
        {...register("additionalInfo")}
      />
    </div>
  );
}
