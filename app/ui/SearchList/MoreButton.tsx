"use client";

import type { ComponentProps } from "react";

import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import type { SearchState } from "#lib/types/state.js";
import Button from "#ui/Button/Button.jsx";

interface MoreButtonProps extends ComponentProps<"button"> {
  status: SearchState["status"];
}

export default function MoreButton({
  status,
  className,
  ...props
}: MoreButtonProps) {
  const platform = usePlatformStore((state) => state.platform);

  const loading = status === "LOADING_MORE";
  const disabled =
    status === "END" || status === "ERROR" || status === "LOADING";

  return (
    <Button
      color={PLATFORM_COLOR[platform]}
      theme="sub"
      loading={loading}
      className={`mt-3 ${disabled ? "hidden" : ""}`}
      {...props}>
      더보기
    </Button>
  );
}
