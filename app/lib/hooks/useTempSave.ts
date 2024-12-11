"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  checkStorageUsable,
  getStorageItemList,
  removeStorageItem,
  setStorageItem,
} from "#lib/utils/localStorage.js";

const PREFIX = "patda";

const EMPTY_SAVE = { key: "", data: null, isActive: false };

interface UseTempSaveProps {
  containerId: string;
  multiSaveEnabled?: boolean;
  onSelect?: (data: { [key: string]: any }) => void;
}

export default function useTempSave({
  containerId,
  multiSaveEnabled,
  onSelect,
}: UseTempSaveProps) {
  const storageKey = PREFIX + containerId;

  const [tempSaveIdx, setTempSaveIdx] = useState<number | undefined>();
  const [shouldListUpdate, setShouldListUpdate] = useState(false);

  const tempSaveList = useMemo(() => {
    if (shouldListUpdate) setShouldListUpdate(false);
    return getStorageItemList(storageKey)
      .map(parseStorageData)
      .sort(sortDataByKeyIdx);
  }, [shouldListUpdate, storageKey]);

  const curTempSave =
    tempSaveIdx !== undefined ? tempSaveList[tempSaveIdx] : EMPTY_SAVE;

  const [tempSaveEnabled, setTempSaveEnabled] = useState(false);
  const [tempSaveVisible, setTempSaveVisible] = useState(false);

  useEffect(() => {
    if (checkStorageUsable()) {
      setTempSaveEnabled(true);
      setTimeout(() => setTempSaveVisible(true), 1);
    }
  }, []);

  const saveData = useCallback(
    (data: { [key: string]: any }) => {
      let nextIdx = tempSaveIdx;
      if (nextIdx === undefined) {
        nextIdx = multiSaveEnabled ? tempSaveList.length : 0;
        setTempSaveIdx(nextIdx);
      }

      setShouldListUpdate(true);

      const key = getStorageKeyWithIdx(storageKey, nextIdx);
      return setStorageItem(key, JSON.stringify(data));
    },
    [multiSaveEnabled, storageKey, tempSaveIdx, tempSaveList.length]
  );

  const selectTempSave = useCallback(
    (idx?: number) => {
      const nextIdx = multiSaveEnabled && idx !== undefined ? idx : 0;
      setTempSaveIdx(nextIdx);

      setShouldListUpdate(true);

      onSelect?.(tempSaveList[nextIdx].data);
    },
    [multiSaveEnabled, onSelect, tempSaveList]
  );

  const deleteTempSave = useCallback(
    (idx: number) => {
      if (idx >= tempSaveList.length) return;

      removeStorageItem(getStorageKeyWithIdx(storageKey, idx));
      setShouldListUpdate(true);
    },
    [storageKey, tempSaveList.length]
  );

  return {
    curTempSave,
    tempSaveIdx,
    tempSaveList,
    tempSaveEnabled,
    tempSaveVisible,
    saveData,
    selectTempSave,
    deleteTempSave,
  };
}

function parseStorageData({ key, data }: { key: string; data: string | null }) {
  if (!data) return { key, data: null };

  const parsedData = JSON.parse(data);
  return { key, data: parsedData };
}

function sortDataByKeyIdx(
  a: ReturnType<typeof parseStorageData>,
  b: ReturnType<typeof parseStorageData>
) {
  const aKeyIdx = Number(a.key.split("_")[1]);
  const bKeyIdx = Number(b.key.split("_")[1]);

  return aKeyIdx - bKeyIdx;
}

function getStorageKeyWithIdx(storageKey: string, idx: number) {
  return `${storageKey}_${idx}`;
}
