"use client";

import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";

import { Platform } from "@/types/property";

function Category() {
  const platform = usePlatformStore((state) => state.platform);

  const platformName: { [key in Platform]: string } = {
    daangn: "당근",
    bunjang: "번개장터",
    joongna: "중고나라",
    etc: "기타",
  };

  const platformStyle: { [key in Platform]: string } = {
    daangn: "text-orange-700",
    bunjang: "text-red-700",
    joongna: "text-green-700",
    etc: "text-zinc-700",
  };

  const defualtStyle = "w-24 pl-1 text-center";

  return (
    <label className={`${defualtStyle} ${platformStyle[platform]}`}>
      {platformName[platform]}
    </label>
  );
}

export default Category;
