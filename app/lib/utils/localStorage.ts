export function getStorageItem(key: string) {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem(key);
  }

  return null;
}

export function setStorageItem(key: string, value: any) {
  if (typeof localStorage === "undefined") return;

  try {
    localStorage.setItem(key, value.toString());
    return true;
  } catch (err) {
    console.error(err);
  }
}

export function removeStorageItem(key: string) {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(key);
  }
}

export function getStorageItemList(prefix: string) {
  if (typeof localStorage === "undefined") return [];

  const itemList: { key: string; data: string | null }[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(prefix)) {
      itemList.push({ key, data: getStorageItem(key) });
    }
  }

  return itemList;
}
