"use client";

import { Fieldset } from "@headlessui/react";
import { useCallback, useState } from "react";

import ProfileForm from "#app/profile/(platform)/_component/ProfileForm.jsx";
import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import type { ProfileData } from "#lib/database/users.js";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import { parsePlatformUserInfo } from "#lib/utils/user.js";
import Logo from "#public/당근빳다.svg";
import Legend from "#ui/formItems/Legend.jsx";
import HelpCircle from "#ui/HelpCircle/HelpCircle.jsx";

interface PostProfileFormProps {
  profile?: Omit<ProfileData, "userId">;
}

export default function PostProfileForm({ profile }: PostProfileFormProps) {
  const platform = usePlatformStore((store) => store.platform);
  const { nickname, additionalInfo, etcPlatformName } = parsePlatformUserInfo(
    platform,
    profile
  );

  const [isTarget, setIsTarget] = useState(!nickname);
  const onSuccess = useCallback(() => {
    setIsTarget(false);
  }, []);

  const color = PLATFORM_COLOR[platform];

  return (
    <>
      <Fieldset className="mt-12 flex w-full min-w-80 max-w-3xl justify-between px-3 md:w-5/6">
        <Legend colorStyle={color} className="group flex h-12 break-keep">
          본인 닉네임
          <Logo className="ml-1 size-8 origin-[25%_75%] group-hover:animate-swing" />
        </Legend>
        <HelpCircle className="mt-1">
          작성자 본인도 닉네임을 표시하면 글의 신뢰도를 높일 수 있습니다.
        </HelpCircle>
      </Fieldset>
      <ProfileForm
        isTarget={isTarget}
        platform={platform}
        nickname={nickname}
        additionalInfo={additionalInfo}
        etcPlatformName={etcPlatformName}
        onSuccess={onSuccess}
        onEdit={() => setIsTarget(true)}
        className="flex w-full min-w-80 max-w-3xl justify-between gap-6 px-3 md:w-5/6"
      />
    </>
  );
}
