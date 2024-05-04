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

  const containerDefaultStyle = "absolute top-1/2 h-1/2 transition-transform";

  const containerStyle = [
    "rotate-0 duration-0",
    "-rotate-90 duration-300",
    "rotate-0 duration-0",
    "rotate-90 duration-300",
  ];

  const itemContainerStyle = [
    "-rotate-45",
    "rotate-45 scale-50",
    "rotate-[135deg] scale-[.35]",
    "-rotate-[135deg] scale-50",
  ];

  const itemRotateStyle = ["", "-rotate-90", "rotate-180", "rotate-90"];

  return (
    <div className={`${containerDefaultStyle} ${containerStyle[selectedItem]}`}>
      {itemList.current.map((item, idx) => (
        <div
          key={item}
          className={`absolute origin-top-left ${itemContainerStyle[idx]}`}
          onClick={handleItemClick(idx)}>
          <CategoryItem platform={item} className={`${itemRotateStyle[idx]}`} />
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
