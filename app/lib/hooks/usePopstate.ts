"use client";

import { useCallback, useEffect } from "react";

interface UsePopstateProps {
  onPopstate: () => void;
  condition?: boolean;
}

// callback prop 리렌더링 방지 및 cleanup 함수 내 callback 참조 유지 역할
let onPopstateStore: () => void;

export default function usePopstate({
  onPopstate,
  condition = true,
}: UsePopstateProps) {
  onPopstateStore = onPopstate;

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (condition) {
      history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", onPopstateStore);
    }

    return () => {
      window.removeEventListener("popstate", onPopstateStore);
    };
  }, [condition]);

  const handleExternalPopAction = useCallback(() => {
    onPopstateStore();
    if (typeof history !== "undefined") {
      history.back();
    }
  }, []);

  return { handleExternalPopAction };
}
