"use client";

import { useRouter } from "next/navigation";
import {
  type ComponentProps,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useCallback,
} from "react";

import PlatformUserInfo from "#app/profile/(platform)/_component/PlatformUserInfo.jsx";
import {
  type ProfileFormValues,
  upsertProfileAction,
} from "#lib/actions/profile/updateProfileAction.js";
import { useFormAction } from "#lib/hooks/useFormAction.js";
import type { Platform } from "#lib/types/property.js";
import EditButton from "#ui/Button/EditButton.jsx";

interface ProfileFormProp extends ComponentProps<"form"> {
  platform: Platform;
  isTarget: boolean;
  setTargetPlatform: Dispatch<SetStateAction<Platform | null>>;
  nickname: string;
  additionalInfo: string;
  etcPlatformName?: string;
}

export default function ProfileForm({
  platform,
  isTarget,
  setTargetPlatform,
  nickname,
  additionalInfo,
  etcPlatformName,
  className,
  children,
  ...props
}: PropsWithChildren<ProfileFormProp>) {
  const router = useRouter();

  const onSuccess = useCallback(() => {
    setTargetPlatform(null);

    router.refresh();
  }, [router, setTargetPlatform]);

  const {
    register,
    formState: { errors },
    formAction,
  } = useFormAction<ProfileFormValues>({
    action: upsertProfileAction.bind(null, platform),
    onSuccess,
  });

  const handleEditClick = () => {
    if (isTarget) return;

    setTargetPlatform(platform);
  };

  return (
    <form action={formAction} className={className} {...props}>
      {children}
      <PlatformUserInfo
        platform={platform}
        nickname={nickname}
        additionalInfo={additionalInfo}
        etcPlatformName={etcPlatformName}
        isEdit={isTarget}
        register={register}
        className="grow"
      />
      <EditButton
        isEdit={isTarget}
        platform={platform}
        onClick={handleEditClick}
      />
    </form>
  );
}
