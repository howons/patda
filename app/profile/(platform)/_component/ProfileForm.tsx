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
  nickname: string;
  additionalInfo: string;
  etcPlatformName?: string;
  onSuccess?: () => void;
  onEdit?: () => void;
}

export default function ProfileForm({
  platform,
  isTarget,
  nickname,
  additionalInfo,
  etcPlatformName,
  onSuccess,
  onEdit,
  className,
  children,
  ...props
}: PropsWithChildren<ProfileFormProp>) {
  const router = useRouter();

  const handleSuccess = useCallback(() => {
    onSuccess?.();

    router.refresh();
  }, [router, onSuccess]);

  const {
    register,
    formState: { errors },
    formAction,
  } = useFormAction<ProfileFormValues>({
    action: upsertProfileAction.bind(null, platform),
    onSuccess: handleSuccess,
  });

  const handleEditClick = () => {
    if (isTarget) return;

    onEdit?.();
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
