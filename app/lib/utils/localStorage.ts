export function getStorageItem(key: string) {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem(key);
  }
}

export function setStorageItem(key: string, value: any) {
  if (typeof localStorage === "undefined") return;

  try {
    localStorage.setItem(key, value.toString());
  } catch (err) {
    console.error(err);
  }
}

export function removeStorageItem(key: string) {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(key);
  }
}
