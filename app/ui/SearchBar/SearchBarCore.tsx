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
    <Combobox>
      <Combobox.Input />
      <Combobox.Options>
        {tempList.map(({ id, name }) => (
          <Combobox.Option key={id} value={name}>
            <li>{name}</li>
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}

export default SearchBarCore;
