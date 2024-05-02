"use client";

import { Combobox } from "@headlessui/react";
import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { useState } from "react";

import { Platform } from "@/types/property";

const tempList = [
  { id: 1, name: "time" },
  { id: 2, name: "device" },
  { id: 3, name: "horizon" },
];

function SearchBarCore() {
  const [query, setQuery] = useState("");
  const platform = usePlatformStore((state) => state.platform);

  const platformStyle: { [key in Platform]: string } = {
    daangn: "focus:outline-orange-400",
    bunjang: "focus:outline-red-400",
    joongna: "focus:outline-green-400",
    etc: "focus:outline-zinc-400",
  };

  const inputDefaultStyle = "h-full rounded-r-full bg-transparent px-5";

  return (
    <div className="h-full grow">
      <Combobox>
        <Combobox.Input
          className={`${inputDefaultStyle} ${platformStyle[platform]}`}
        />
        <Combobox.Options>
          {tempList.map(({ id, name }) => (
            <Combobox.Option key={id} value={name}>
              {name}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}

export default SearchBarCore;
