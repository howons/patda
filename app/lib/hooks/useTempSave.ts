"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  checkStorageUsable,
  getStorageItemList,
  removeStorageItem,
  setStorageItem,
} from "#lib/utils/localStorage.js";

const PREFIX = "patda";

const EMPTY_SAVE = { key: "", data: null };

interface UseTempSaveProps {
  containerId: string;
  onSelect?: (data: { [key: string]: any }) => void;
}

export default function useTempSave({
  containerId,
  onSelect,
}: UseTempSaveProps) {
  const storageKey = PREFIX + containerId;

  const [tempSaveKey, setTempSaveKey] = useState<string | undefined>();
  const [shouldListUpdate, setShouldListUpdate] = useState(false);

  const tempSaveList = useMemo(() => {
    if (shouldListUpdate) setShouldListUpdate(false);
    return getStorageItemList(storageKey)
      .map(parseStorageData)
      .sort(sortDataByKeyIdx);
  }, [shouldListUpdate, storageKey]);

  const curTempSave =
    tempSaveKey !== undefined
      ? getTempSaveByKey(tempSaveList, tempSaveKey)
      : EMPTY_SAVE;

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
      let nextKey = tempSaveKey;
      if (nextKey === undefined) {
        nextKey = generateNewTempSaveKey(tempSaveList, storageKey);
        setTempSaveKey(nextKey);
      }

      setShouldListUpdate(true);

      return setStorageItem(nextKey, JSON.stringify(data));
    },
    [storageKey, tempSaveKey, tempSaveList]
  );

  const selectTempSave = useCallback(
    (key: string) => {
      setTempSaveKey(key);

      onSelect?.(getTempSaveByKey(tempSaveList, key).data);
    },
    [onSelect, tempSaveList]
  );

  const deleteTempSave = useCallback((key: string) => {
    removeStorageItem(key);
    setShouldListUpdate(true);
  }, []);

  return {
    curTempSave,
    tempSaveKey,
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

function getTempSaveByKey(
  tempSaveList: { key: string; data: any }[],
  targetKey: string
) {
  return tempSaveList.find(({ key }) => key === targetKey) ?? EMPTY_SAVE;
}

function generateNewTempSaveKey(
  tempSaveList: { key: string; data: any }[],
  storageKey: string
) {
  const lastTempSave = tempSaveList.at(-1);
  if (!lastTempSave) {
    return `${storageKey}_0`;
  }

  const lastTempSaveIdx = Number(lastTempSave.key.split("_")[1]);
  const nextIdx = Number.isNaN(lastTempSaveIdx) ? 0 : lastTempSaveIdx + 1;

  return `${storageKey}_${nextIdx}`;
}
