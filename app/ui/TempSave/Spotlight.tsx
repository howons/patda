"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";

import type { TempSaveItemStatus } from "#lib/types/property.js";
import { cn } from "#utils/utils.js";

interface SpotlightProps {
  isTarget: boolean;
  itemStatus: TempSaveItemStatus;
  handleItemClick: (
    itemStatus?: TempSaveItemStatus
  ) => (e: MouseEvent<HTMLElement>) => void;
}

export default function Spotlight({
  isTarget,
  itemStatus,
  handleItemClick,
}: SpotlightProps) {
  const [spotlightTransitioning, setSpotlightTransitioning] = useState(false);
  const [spotlightTransitionEnabled, setSpotlightTransitionEnabled] =
    useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    setSpotlightTransitionEnabled(isTarget);

    if (isTarget) {
      setSpotlightTransitioning(true);
    } else {
      timeoutRef.current = setTimeout(
        () => setSpotlightTransitioning(false),
        500
      );
    }

    return () => clearTimeout(timeoutRef.current);
  }, [isTarget]);

  if (!(isTarget || spotlightTransitioning)) return <></>;

  return (
    <>
      <div
        className={cn(
          "absolute right-[-27.5rem] top-[-33.75rem] size-[70rem] rounded-full border border-neutral-400/10 transition-all duration-500",
          spotlightTransitionEnabled &&
            "border-[447px] border-neutral-400/50 hover:border-neutral-400/70",
          "ambient-shadow"
        )}
        onClick={handleItemClick()}
      />
      <div
        className="absolute right-2 top-[-5.75rem] size-56 rounded-full"
        onClick={handleItemClick(itemStatus)}
      />
    </>
  );
}
