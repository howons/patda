"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  checkStorageUsable,
  getStorageItemList,
  setStorageItem,
} from "#lib/utils/localStorage.js";

const PREFIX = "patda";

const EMPTY_SAVE = { key: "", data: null };

interface UseTempSaveProps {
  containerId: string;
  enableMultiSave?: boolean;
}

export default function useTempSave({
  containerId,
  enableMultiSave,
}: UseTempSaveProps) {
  const storageKey = PREFIX + containerId;

  const [tempSaveIdx, setTempSaveIdx] = useState<number | undefined>();

  const tempSaveList = useMemo(
    () =>
      getStorageItemList(storageKey).map(({ key, data }, idx) => {
        if (!data) return { key, data };

        const parsedData = JSON.parse(data);
        return { key, data: parsedData, isActive: idx === tempSaveIdx };
      }),
    [storageKey, tempSaveIdx]
  );

  const curTempSave =
    tempSaveIdx !== undefined ? tempSaveList[tempSaveIdx] : EMPTY_SAVE;

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
      let nextIdx = tempSaveIdx;
      if (tempSaveIdx === undefined) {
        nextIdx = enableMultiSave ? tempSaveList.length : 0;
        setTempSaveIdx(nextIdx);
      }

      const key = storageKey + nextIdx;
      return setStorageItem(key, JSON.stringify(data));
    },
    [enableMultiSave, storageKey, tempSaveIdx, tempSaveList.length]
  );

  const selectTempSave = useCallback(
    (idx?: number) => {
      if (!enableMultiSave) {
        setTempSaveIdx(0);
        return;
      }

      setTempSaveIdx(idx);
    },
    [enableMultiSave]
  );

  return {
    curTempSave,
    tempSaveList,
    tempSaveEnable,
    tempSaveVisible,
    saveData,
    selectTempSave,
  };
}
