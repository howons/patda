"use client";

import { PLATFORM_COLOR } from "#lib/constants/platform.js";
import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import type { SearchState } from "#lib/types/state.js";
import Button from "#ui/Button/Button.jsx";

interface MoreButtonProps {
  status: SearchState["status"];
  onClick: () => void;
}

export default function MoreButton({ status, onClick }: MoreButtonProps) {
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
      onClick={onClick}>
      더보기
    </Button>
  );
}
