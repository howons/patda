export function checkStorageUsable() {
  return typeof localStorage !== "undefined";
}

export function getStorageItem(key: string) {
  if (checkStorageUsable()) {
    return localStorage.getItem(key);
  }

  return null;
}

export function setStorageItem(key: string, value: any) {
  if (!checkStorageUsable()) return;

  try {
    localStorage.setItem(key, value.toString());
    return true;
  } catch (err) {
    console.error(err);
  }
}

export function removeStorageItem(key: string) {
  if (checkStorageUsable()) {
    localStorage.removeItem(key);
  }
}

export function getStorageItemList(prefix: string) {
  if (!checkStorageUsable()) return [];

  const itemList: { key: string; data: string | null }[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(prefix)) {
      itemList.push({ key, data: getStorageItem(key) });
    }
  }

  return itemList;
}
