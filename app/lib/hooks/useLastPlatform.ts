"use client";

import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { Platform } from "@lib/types/property";
import { useRef, useState } from "react";

function useLastPlatform(delay: number) {
  const [lastPlatform, setLastPlatform] = useState<Platform>("daangn");
  const transitionTimer = useRef<NodeJS.Timeout | null>(null);
  const platform = usePlatformStore((state) => state.platform);

  const isChanging = platform !== lastPlatform;

  if (isChanging && !transitionTimer.current) {
    transitionTimer.current = setTimeout(() => {
      setLastPlatform(platform);
      transitionTimer.current = null;
    }, delay);
  }

  return { lastPlatform, platform, isChanging };
}

export default useLastPlatform;
