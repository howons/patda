"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  checkStorageUsable,
  getStorageItemList,
  setStorageItem,
} from "#lib/utils/localStorage.js";

const PREFIX = "patda";

interface UseTempSaveProps {
  containerId: string;
  enableMultiSave?: boolean;
}

export default function useTempSave({
  containerId,
  enableMultiSave,
}: UseTempSaveProps) {
  const storageKey = PREFIX + containerId;

  const tempSaveList = useMemo(
    () =>
      getStorageItemList(storageKey).map(({ data }) => {
        if (!data) return null;

        const parsedData = JSON.parse(data);
        return parsedData;
      }),
    [storageKey]
  );

  const initialIdx = enableMultiSave ? tempSaveList.length : 0;
  const [tempSaveIdx, setTempSaveIdx] = useState(initialIdx);

  const curTempSave = tempSaveList[tempSaveIdx];

  const [tempSaveEnable, setTempSaveEnable] = useState(false);
  const [tempSaveVisible, setTempSaveVisible] = useState(false);
  useEffect(() => {
    if (checkStorageUsable()) {
      setTempSaveEnable(true);
      setTimeout(() => setTempSaveVisible(true), 1);
    }
  }, []);

  const saveData = useCallback(
    (data: { [key: string]: any }) => {
      const key = storageKey + tempSaveIdx;
      return setStorageItem(key, JSON.stringify(data));
    },
    [storageKey, tempSaveIdx]
  );

  const selectTempSave = useCallback(
    (idx: number) => {
      if (!enableMultiSave) return;

      setTempSaveIdx(idx);
    },
    [enableMultiSave]
  );

  return {
    curTempSave,
    tempSaveIdx,
    tempSaveList,
    tempSaveEnable,
    tempSaveVisible,
    saveData,
    selectTempSave,
  };
}
