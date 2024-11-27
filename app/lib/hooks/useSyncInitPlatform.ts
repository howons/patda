"use client";

import { useEffect } from "react";

import { usePlatformStore } from "#lib/providers/PlatformStoreProvider.jsx";
import type { Platform } from "#lib/types/property.js";

interface UseSyncInitPlatformProps {
  initPlatform: Platform | undefined;
}

export default function useSyncInitPlatform({
  initPlatform,
}: UseSyncInitPlatformProps) {
  const updatePlatform = usePlatformStore((store) => store.updatePlatform);

  useEffect(() => {
    if (!initPlatform) return;

    updatePlatform(initPlatform);
  }, [updatePlatform, initPlatform]);
}
