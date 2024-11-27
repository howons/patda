"use client";

import { getStorageItemList, setStorageItem } from "#lib/utils/localStorage.js";

const PREFIX = "patda";

interface UseTempSaveProps {
  containerId: string;
}

export default function useTempSave({ containerId }: UseTempSaveProps) {
  const storageKey = PREFIX + containerId;

  const saveData = (data: { [key: string]: string }) => {
    return setStorageItem(storageKey, JSON.stringify(data));
  };

  const getMyDataList = () => {
    return getStorageItemList(storageKey).filter(({ data }) => {
      if (!data) return false;

      const parsedData = JSON.parse(data);
      return parsedData;
    });
  };

  return {
    saveData,
    getMyDataList,
  };
}
