"use client";

import { Combobox } from "@headlessui/react";
import { useState } from "react";

const tempList = [
  { id: 1, name: "time" },
  { id: 2, name: "device" },
  { id: 3, name: "horizon" },
];

function SearchBarCore() {
  const [query, setQuery] = useState("");

  return (
    <div className="h-full grow">
      <Combobox>
        <Combobox.Input className="h-full rounded-r-full bg-transparent px-5 focus:outline-orange-400" />
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
