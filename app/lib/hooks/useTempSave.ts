"use client";

import { useId, useState } from "react";

import { getStorageItemList, setStorageItem } from "#lib/utils/localStorage.js";

const PREFIX = "patda";

interface UseTempSaveProps {
  containerId: string;
}

export default function useTempSave({ containerId }: UseTempSaveProps) {
  const [tempId, setTempId] = useState<string>();
  const initTempId = useId();

  if (tempId === undefined) {
    setTempId(PREFIX + initTempId);
  }

  const saveData = (data: { [key: string]: string }) => {
    if (!tempId) return;

    const dataWithContainerId = { containerId, ...data };
    return setStorageItem(tempId, JSON.stringify(dataWithContainerId));
  };

  const getMyDataList = () => {
    return getStorageItemList(PREFIX).filter(({ data }) => {
      if (!data) return false;

      const parsedData = JSON.parse(data);
      return parsedData?.containerId === containerId;
    });
  };
}
