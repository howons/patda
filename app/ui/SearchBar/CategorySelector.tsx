"use client";

import CategoryItem from "@ui/SearchBar/CategoryItem";
import { useRef, useState } from "react";

import { Platform } from "@/types/property";

const ROTATE_DURATION = 300;

function CategorySelector() {
  const [selectedItem, setSelectedItem] = useState(0);
  const itemList = useRef<Platform[]>(["daangn", "bunjang", "etc", "joongna"]);

  const handleItemClick = (idx: number) => () => {
    if (selectedItem !== 0) return;

    setSelectedItem(idx);
    setTimeout(() => {
      reorderItemList(idx, itemList.current);
      setSelectedItem(0);
    }, ROTATE_DURATION);
  };

  const selectorDefaultStyle = "absolute top-1/2 transition-transform";

  const selectorStyle = [
    "rotate-0 duration-0",
    "-rotate-90 duration-300",
    "rotate-0 duration-0",
    "rotate-90 duration-300",
  ];

  const containerDefaultStyle = "absolute origin-top-left transition-transform";

  const containerRotateStyle = [
    "-rotate-45",
    "rotate-45",
    "rotate-[135deg]",
    "-rotate-[135deg]",
  ];

  const containerScaleStyle = [
    [
      "duration-0",
      "scale-50 duration-300",
      "scale-[.35] duration-300",
      "scale-50 duration-300",
    ],
    [
      "scale-50 duration-0",
      "duration-300",
      "scale-50 duration-0",
      "scale-[.35] duration-300",
    ],
    [
      "scale-[.35] duration-0",
      "scale-50 duration-300",
      "duration-300",
      "scale-50 duration-300",
    ],
    [
      "scale-50 duration-0",
      "scale-[.35] duration-300",
      "scale-50 duration-0",
      "duration-300",
    ],
  ];

  const itemRotateStyle = [
    [
      "duration-0",
      "rotate-90 duration-300",
      "duration-0",
      "-rotate-90 duration-300",
    ],
    [
      "-rotate-90 duration-0",
      "duration-300",
      "-rotate-90 duration-0",
      "-rotate-180 duration-300",
    ],
    [
      "rotate-180 duration-0",
      "rotate-[270deg] duration-300",
      "rotate-180 duration-0",
      "rotate-90 duration-300",
    ],
    [
      "rotate-90 duration-0",
      "rotate-180 duration-300",
      "rotate-90 duration-0",
      "duration-300",
    ],
  ];

  return (
    <div className={`${selectorDefaultStyle} ${selectorStyle[selectedItem]}`}>
      {itemList.current.map((item, idx) => (
        <div
          key={item}
          className={`${containerDefaultStyle} ${containerRotateStyle[idx]} ${containerScaleStyle[idx][selectedItem]}`}
          onClick={handleItemClick(idx)}>
          <CategoryItem
            platform={item}
            className={`transition-transform ${itemRotateStyle[idx][selectedItem]}`}
          />
        </div>
      ))}
    </div>
  );
}

function reorderItemList(clickedItem: number, itemList: Platform[]) {
  switch (clickedItem) {
    case 1:
      itemList.push(itemList.shift()!);
      break;
    case 2:
      [itemList[0], itemList[2]] = [itemList[2], itemList[0]];
      break;
    case 3:
      itemList.unshift(itemList.pop()!);
  }
}

export default CategorySelector;
