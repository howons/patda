"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { usePlatformStore } from "@lib/providers/PlatformStoreProvider";
import { Platform } from "@lib/types/property";
import { useState } from "react";

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
        <ComboboxInput
          className={`${inputDefaultStyle} ${platformStyle[platform]}`}
        />
        <ComboboxOptions>
          {tempList.map(({ id, name }) => (
            <ComboboxOption key={id} value={name}>
              {name}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}

export default SearchBarCore;
